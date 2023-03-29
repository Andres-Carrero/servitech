<?php

namespace App\Http\Controllers;

use ADP\Helpers\SiteHelper;
use App\Imports\ProductsImport;
use App\Imports\ProductsLoad;
use App\Models\Especificaciones;
use App\Models\Imagenes;
use App\Models\Productos;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
class ProductosController extends Controller
{
    public function getEmptyProductos(Request $request){
        $cantEmpty = Productos::where('prod_cantidad', 0)->where('prod_estado_id', 1)->count();
        $precioEmpty = Productos::where('prod_precio_venta', 0)->where('prod_estado_id', 1)->count();
        $products = Productos::where('prod_estado_id', 1)->get();
        $countEspe = 0;
        $countImg = 0;
  
        for ($i=0; $i < count($products); $i++) {                 
            $espe = Especificaciones::where('esp_producto_id', $products[$i]->prod_id)->get();
            $img = Imagenes::where('img_producto_id', $products[$i]->prod_id)->get();

            if(count($espe) == 0){
                $countEspe = $countEspe + 1;
            }
            if(count($img) == 0){
                $countImg = $countImg + 1;
            }

  
           /* if($img){
                $products[$i]->img = $img->img_descripcion;
            }else{
                $products[$i]->img = '';
            }*/
        }

        return response()->json(array(
            'cantEmpty' => $cantEmpty,
            'precioEmpty' => $precioEmpty,
            'countImg' => $countImg,
            'countEspe' => $countEspe,
            'total' => count($products)
        ), 200);
    }

    public function getProductoByCodigo(Request $request, $codigo){
        $product = Productos::where('prod_id', $codigo)->first();
        $imgs = Imagenes::where('img_producto_id', $codigo)->get();
        $espe = Especificaciones::where('esp_producto_id', $codigo)->get();

        return response()->json(array(
            'data' => $product,
            'img' => $imgs,
            'especificaciones' => $espe
        ), 200);
    }

    public function getProductoByCodigoArray(Request $request){
        $product = Productos::whereIn('prod_id', $request->all()['codigo'])->get();

        return response()->json(array(
            'data' => $product,
        ), 200);
    }

    public function deleteProducto(Request $request, $codigo){
        Productos::where('prod_id',  $codigo)->update([
            'prod_estado_id' => 2
        ]);

        return response()->json(array(
            'data'=> 'Se elimino el producto',
        ), 200);
    }


    public function productos(Request $request){
        $paginate = $request->all()['paginate'];
        $page = $request->all()['page'];
        $column = $request->all()['column'];
        $direction = $request->all()['direction'];
        $search = $request->all()['search'];

        $products = Productos::
        join('ubicaciones', 'ubicaciones.ubi_id', '=', 'productos.prod_ubicacion_id')
        ->join('estados', 'estados.est_id', '=', 'productos.prod_estado_id')
        ->join('tipo_productos', 'tipo_productos.tipr_id', '=', 'productos.prod_tipo_id');
        if(count($search) > 0){
            if(isset($search['codigo'])){
                $products = $products->where('prod_id', $search['codigo']);
            }
            if(isset($search['desc'])){
                $products = $products->where('prod_nombre', 'like', '%'.$search['desc'].'%');
            }
            if(isset($search['marca'])){
                $products = $products->where('prod_marca', 'like', '%'.$search['marca'].'%');
            }
            if(isset($search['ubi']) && $search['ubi'] != 0){
                $products = $products->where('prod_ubicacion_id', $search['ubi']);
            }
            if(isset($search['tipo']) && $search['tipo'] != 0){
                $products = $products->where('prod_tipo_id', $search['tipo']);
            }
        }
        $products = $products->limit($request->all()['paginate'])->offset(($page-1)*$paginate)
        ->orderBy($column, $direction)
        ->get([
            'prod_id', 'prod_nombre', 'prod_marca', 'prod_precio_venta', 'prod_cantidad',
            'prod_linea', 'prod_ubicacion_id', 'prod_estado_id', 'tipr_descripcion',
            'ubi_descripcion', 'est_descripcion'
        ]);

        $counts = Productos::
        join('ubicaciones', 'ubicaciones.ubi_id', '=', 'productos.prod_ubicacion_id')
        ->join('tipo_productos', 'tipo_productos.tipr_id', '=', 'productos.prod_tipo_id')
        ->join('estados', 'estados.est_id', '=', 'productos.prod_estado_id');
        if(count($search) > 0){
            if(isset($search['codigo'])){
                $counts = $counts->where('prod_id', $search['codigo']);
            }
            if(isset($search['desc'])){
                $counts = $counts->where('prod_nombre', 'like', '%'.$search['desc'].'%');
            }
            if(isset($search['marca'])){
                $counts = $counts->where('prod_marca', 'like', '%'.$search['marca'].'%');
            }
            if(isset($search['ubi']) && $search['ubi'] != 0){
                $counts = $counts->where('prod_ubicacion_id', $search['ubi']);
            }
            if(isset($search['tipo']) && $search['tipo'] != 0){
                $counts = $counts->where('prod_tipo_id', $search['tipo']);
            }
        }
        $counts = $counts->get();

        return response()->json(array(
            'data'=> $products,
            'total' => count($counts),
        ), 200);
    }

    public function uploadProducto(Request $request){
        $path = $request->all()['file']->getRealPath();
        $excel = Excel::import(new ProductsLoad, $path);

        return response()->json(array(
            'data'=> 'Se agregaron nuevos productos',
            'res' => $excel
        ), 200);
    }

    public function createProductos(Request $request){
        $body = $request->all();
        $product = Productos::where('prod_id', $body['codigo'])->first();

        if(isset($product) == false){
            $prod = Productos::create([
                'prod_id' => $body['codigo'],
                'prod_nombre' => $body['nombre'],
                'prod_marca' => $body['marca'],
                'prod_precio_venta' => 0,
                'prod_cantidad' => 0,
                'prod_linea' => $body['linea'],
                'prod_ubicacion_id' => $body['ubicacion'],
                'prod_estado_id' => 1,
                'prod_tipo_id' => $body['tipo'],
                'prod_iva' => $body['iva']
            ]);

            for ($i=0; $i < count($body['fotos']); $i++) { 
                $foto = $body['fotos'][$i];

                $img = SiteHelper::savePhotos($foto['img'], 'producto_'.$body['codigo'].'_'.$foto['id'], 'productos');
                Imagenes::create([
                    'img_descripcion' => $img,
                    'img_producto_id' => $body['codigo']
                ]);
            }

            for ($i=0; $i < count($body['especificaciones']); $i++) { 
                $espe = $body['especificaciones'][$i];
                Especificaciones::create([
                    'esp_titulo' => $espe['title'],
                    'esp_descripcion' => $espe['descripcion'],
                    'esp_importancia' => $espe['importancia'],
                    'esp_producto_id' => $body['codigo']
                ]);
            }

            return response()->json(array(
                'data'=> 'Se Creo el producto',
                'redirect' => true
            ), 200);

        }else{
            if($body['validate'] == 2){
                Productos::where('prod_id',  $product->prod_id)->update([
                    'prod_nombre' => $body['nombre'],
                    'prod_marca' => $body['marca'],
                    'prod_tipo_id' => $body['tipo'],
                    'prod_linea' => $body['linea'],
                    'prod_ubicacion_id' => $body['ubicacion'],
                    'prod_iva' => $body['iva']
                ]);
        
                if(count($body['fotos']) > 0){
                    for ($i=0; $i < count($body['fotos']); $i++) { 
                        $foto = $body['fotos'][$i];
            
                        $img = SiteHelper::savePhotos($foto['img'], 'producto_'.$product->prod_id.'_'.$foto['id'], 'productos');
                        Imagenes::create([
                            'img_descripcion' => $img,
                            'img_producto_id' => $product->prod_id
                        ]);
                    }
                }
        
                if(count($body['deletesImg']) > 0){
                    for ($i=0; $i < count($body['deletesImg']); $i++) { 
                        $foto = $body['deletesImg'][$i];
                        Imagenes::where('img_descripcion', $foto['img'])->delete();
                    }
                }
        
                if(count($body['especificaciones']) > 0){
                    for ($i=0; $i < count($body['especificaciones']); $i++) { 
                        $espe = $body['especificaciones'][$i];
                        Especificaciones::create([
                            'esp_titulo' => $espe['title'],
                            'esp_descripcion' => $espe['descripcion'],
                            'esp_importancia' => $espe['importancia'],
                            'esp_producto_id' => $product->prod_id
                        ]);
                    }
                }
        
                if(count($body['deletesEspe']) > 0){
                    for ($i=0; $i < count($body['deletesEspe']); $i++) { 
                        $espe = $body['deletesEspe'][$i];
                        Especificaciones::where('esp_titulo', $espe['title'])
                            ->where('esp_descripcion', $espe['descripcion'])
                            ->where('esp_producto_id', $product->prod_id)          
                            ->delete();
                    }
                }
        
                return response()->json(array(
                    'data'=> 'Se actualizo el producto',
                    'redirect' => true
                ), 200);
            }else{
                return response()->json(array(
                    'data'=> 'El producto ya existe',
                    'redirect' => false
                ), 200);
            }
            
        }
    }


    
}