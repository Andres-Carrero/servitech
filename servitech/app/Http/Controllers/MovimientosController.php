<?php

namespace App\Http\Controllers;

use App\Models\Entrada;
use App\Models\Especificaciones;
use App\Models\Imagenes;
use App\Models\Movimientos;
use App\Models\Productos;
use App\Models\Salida;
use App\Models\TipoProducto;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class MovimientosController extends Controller
{

    public function getProductsAll(Request $request){
        $products = Productos::
        join('ubicaciones', 'ubicaciones.ubi_id', '=', 'productos.prod_ubicacion_id')
        ->join('tipo_productos', 'tipo_productos.tipr_id', '=', 'productos.prod_tipo_id');

        if($request->all()['search']){
            $products = $products->where('prod_nombre', 'LIKE', '%'.$request->all()['search'].'%')
            ->orWhere('prod_id', $request->all()['search'])
            ->orWhere('prod_marca', 'LIKE', '%'.$request->all()['search'].'%');
        }

        $products = $products
        ->orderBy('prod_nombre', 'asc')
        ->get([
            'prod_id', 
            'prod_nombre', 
            'prod_marca', 
            'prod_precio_venta', 
            'prod_cantidad', 
            'prod_iva',
            'ubi_descripcion',
            'tipr_descripcion',
            'prod_estado_id'
        ]);

        $arrayData = [];
        for ($i=0; $i < count($products); $i++) { 
            if($products[$i]['prod_estado_id'] == 1){
                if($request->all()['cant'] > 0){
                    if( $products[$i]['prod_precio_venta'] > 0 && $products[$i]['prod_cantidad'] > 0){
                        array_push($arrayData, $products[$i]);
                    }
                }else{
                    array_push($arrayData, $products[$i]);
                }
            }
        }
        
        return response()->json(array(
            'data'=> $arrayData,
        ), 200);
    }

    public function getProductsAllByTipo(Request $request, $tipo){
        $products = Productos::where('prod_cantidad', '>', 0);
            if($tipo != 0){
                $products = $products->where('prod_tipo_id',  $tipo);
            }
            $products = $products->where('prod_estado_id', 1)->orderBy('prod_nombre', 'asc')->get(['prod_id', 'prod_nombre', 'prod_marca', 'prod_precio_venta', 'prod_cantidad']);

            for ($i=0; $i < count($products); $i++) {                 
                $espe = Especificaciones::where('esp_producto_id', $products[$i]->prod_id)->latest('esp_importancia')->take(5)->get();
                $products[$i]->especificaciones = $espe;

                $img = Imagenes::where('img_producto_id', $products[$i]->prod_id)->first();
                if($img){
                    $products[$i]->img = $img->img_descripcion;
                }else{
                    $products[$i]->img = '';
                }
            }

        return response()->json(array(
            'data'=> $products,
        ), 200);
    }


    public function createdVenta(Request $request){
        $body = $request->all();
        $client = User::where('usu_identificacion', $body['clientSelect']['usu_identificacion'])->value('id');
        $user = JWTAuth::parseToken()->authenticate();

        $mov = Movimientos::create([
            'mov_fecha' => $body['fecha'],
            'mov_hora' => $body['hora'],
            'mov_cantidad' => count($body['listProduct']),
            'mov_total' => $body['totalProducts'],
            'mov_tipo_movimiento_id' => 2,
            'mov_usuario_id' => $client,
            'mov_cajero_id'  => $user->id,
            'mov_moneda' => 'COP',
            'mov_recibido' => $body['recibido'],
            'mov_cambio' => $body['cambio'],
            'mov_total_iva' => $body['totalIva'],
            'mov_iva' => $body['iva'],
            'mov_entregado' => 'SI'
        ]);

        for ($i=0; $i < count($body['listProduct']); $i++) { 
            $product = $body['listProduct'][$i];

            Salida::create([
                'sal_fecha' => $body['fecha'],
                'sal_hora' => $body['hora'],
                'sal_moneda' => 'COP',
                'sal_total' => $product['subTotal'],
                'sal_cantidad' => $product['buyCantidad'],
                'sal_precio' => $product['prod_precio_venta'],
                'sal_producto_id' => $product['prod_id'],
                'sal_movimiento_id' => $mov->id
            ]);

            Productos::where('prod_id', $product['prod_id'])->update([
                'prod_cantidad' => $product['prod_cantidad']-$product['buyCantidad'],
            ]);
  
        }


        return response()->json(array(
            'data' => 'Se Genero la venta correctamente',
            'factura_id' => $mov->id
        ), 200);
    }

    public function getClientesAll(Request $request){
        $users = User::where('usu_identificacion', 'LIKE', '%'.$request->all()['identificacion'].'%')
        //->where('usu_role_id', 2)
        ->get(['usu_identificacion', 'usu_nombre', 'usu_apellido', 'id', 'email', 'usu_telefono', 'usu_direccion']);

        return response()->json(array(
            'data'=> $users,
        ), 200);
    }

    public function createdBuy(Request $request){
        $body = $request->all();
        $user = JWTAuth::parseToken()->authenticate();

        $mov = Movimientos::create([
            'mov_fecha' => $body['fecha'],
            'mov_cantidad' => count($body['products']),
            'mov_total' => $body['total'],
            'mov_tipo_movimiento_id' => 3,
            'mov_usuario_id' => null,
            'mov_cajero_id'  => $user->id,
            'mov_hora' => $body['hora'],
            'mov_moneda' => $body['moneda'],
            'mov_recibido' => 0,
            'mov_cambio' => 0,
            'mov_total_iva' => 0,
            'mov_entregado' => 'SI'
        ]);

        for ($i=0; $i < count($body['products']); $i++) {
            $producto = $body['products'][$i];
            $precio = 0;

            if($body['moneda'] != 'COP'){
                $precio = (int)$producto['convert'];
            }else{
                $precio = (int)$producto['precio'];
            }

            Entrada::create([
                'ent_fecha' => $body['fecha'],
                'ent_cantidad' => $producto['cantidad'],
                'ent_precio' => $precio,
                'ent_total' => $producto['precioTotal'],
                'ent_proveedor_id' => $body['proveedor'],
                'ent_producto_id' => $producto['prod_id'],
                'ent_movimiento_id' => $mov->id,
                'ent_hora' => $body['hora'],
                'ent_moneda' => $body['moneda'],
                'ent_precio_iva' => $producto['prod_iva'],
                'ent_precio_total_iva' => $precio+($precio*($producto['prod_iva']/100)),
            ]);

            Productos::where('prod_id',  $producto['prod_id'])->update([
                'prod_precio_venta' => $precio+($precio*($producto['prod_iva']/100)),
                'prod_cantidad' => $producto['prod_cantidad']+$producto['cantidad']
            ]);

        }

        return response()->json(array(
            'data' => $body,
        ), 200);
    }

    
}
