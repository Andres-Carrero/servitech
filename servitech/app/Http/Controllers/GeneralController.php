<?php

namespace App\Http\Controllers;

use App\Models\proveedores;
use App\Models\Roles;
use App\Models\TipoProducto;
use App\Models\Ubicaciones;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\App;
use ADP\Helpers\SiteHelper;
use App\Exports\XLSXProductos;
use App\Models\Movimientos;
use App\Models\Salida;

class GeneralController extends Controller
{
    public function getAllData(Request $request){
        $roles = Roles::get();
        $proveedores = proveedores::get(['prov_id', 'prov_nombre']);
        $ubicaciones = Ubicaciones::get(['ubi_id', 'ubi_descripcion']);
        $tipos = TipoProducto::orderBy('tipr_descripcion', 'asc')->get();


        return response()->json(array(
            'proveedores' => $proveedores,
            'ubicaciones' => $ubicaciones,
            'tipos' => $tipos,
            'roles' => $roles,
        ), 200);
    }

    public function downloadFormats(Request $request, $id){
        if(!isset($request->all()['token'])){
            return [
                'data' => 'failed',
                'msg' => 'Failed to validate authentication'
            ];
        }

        if(!SiteHelper::verifyToken($request->all()['token'])){
            return [
                'data' => 'failed',
                'msg' => 'Your identity could not be verified'
            ];
        }

        switch($id) {
            case(1):
                return Excel::download(new XLSXProductos, 'Carga_de_productos.xlsx');
            break;

            case(2):
                $mov = Movimientos::where('mov_id', $request->all()['invoice'])
                ->join('users', 'users.id', '=', 'movimientos.mov_usuario_id')
                ->first([
                    'mov_id', 'mov_fecha', 'mov_hora', 'mov_total', 'mov_total_iva', 'mov_cambio', 
                    'mov_recibido', 'mov_iva', 'id', 'usu_nombre', 'usu_apellido', 'usu_identificacion', 
                    'email', 'usu_direccion', 'usu_ciudad', 'usu_departamento', 'usu_pais', 'usu_telefono'
                ]);
               
                $sal = Salida::where('sal_movimiento_id', $request->all()['invoice'])
                ->join('productos', 'productos.prod_id', '=', 'salidas.sal_producto_id')
                ->get([
                    'sal_id', 'sal_cantidad', "sal_precio", 'sal_total', 'prod_id', 'prod_nombre', 'prod_marca',
                
                ]);

                $data = ['mov' => $mov, 'sal' => $sal];
                $pdf = App::make('dompdf.wrapper');
                return $pdf->loadView('pdf.invoice', compact('data'))->setPaper('letter')->download('Servitech_Factura_'. $mov['mov_id'].'.pdf');
            break;

            default: 
            break;
        }

    }

    public function converteMoneda(Request $request, $from, $value){
        return response()->json(array(
            'data'=> SiteHelper::convertMoney($from, $value)
        ), 200);
    }
}
