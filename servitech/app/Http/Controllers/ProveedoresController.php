<?php

namespace App\Http\Controllers;

use App\Models\proveedores;
use Illuminate\Http\Request;

class ProveedoresController extends Controller
{
    public function listaProveedores(Request $request){
        $counts = proveedores::get();

        $paginate = $request->all()['paginate'];
        $page = $request->all()['page'];
        $column = $request->all()['column'];
        $direction = $request->all()['direction'];
        $search = $request->all()['search'];

        $proveedores = Proveedores::limit($request->all()['paginate']);
        if(count($search) > 0){
            if(isset($search['codigo'])){
                $proveedores = $proveedores->where('prov_id', $search['codigo']);
            }
            if(isset($search['nombre'])){
                $proveedores = $proveedores->where('prov_nombre','like', '%'. $search['nombre'].'%');
            }
            if(isset($search['email'])){
                $proveedores = $proveedores->where('prov_email','like', '%'. $search['email'].'%');
            }
        }
        $proveedores=$proveedores->offset(($page-1)*$paginate)
        ->orderBy($column, $direction)
        ->get();

        return response()->json(array(
            'data' => $proveedores,
            'total' => count($counts)
        ), 200);
        
    }
    
    public function createProveedores(Request $request){
        $body = $request->all();
        $proveedores = Proveedores::where('prov_nombre', $body['nombre'])->first();

        if(isset($proveedores) == false){
            Proveedores::create([
                'prov_id' => $body['codigo'],
                'prov_nombre' => $body['nombre'],
                'prov_email' => $body['email'],
                'prov_telefono' => $body['telefono'],
             ]);
             return response()->json(array(
                'data'=> "Se ha creado exitosamente",
            ), 200);
        }
        else{
            return response()->json(array(
                'data'=> "Este proveedor ya existe",
            ), 400);
        }
    }

}    