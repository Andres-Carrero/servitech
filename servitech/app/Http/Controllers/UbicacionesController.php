<?php

namespace App\Http\Controllers;

use App\Models\Ubicaciones;
use Illuminate\Http\Request;

class UbicacionesController extends Controller
{
    public function listaUbicaciones(Request $request){
        $counts = Ubicaciones::get();

        $paginate = $request->all()['paginate'];
        $page = $request->all()['page'];
        $column = $request->all()['column'];
        $direction = $request->all()['direction'];
        $search = $request->all()['search'];

        $ubicaciones = Ubicaciones::limit($request->all()['paginate']);
        if(count($search) > 0){
            if(isset($search['codigo'])){
                $ubicaciones = $ubicaciones->where('ubi_id', $search['codigo']);
            }
            if(isset($search['des'])){
                $ubicaciones = $ubicaciones->where('ubi_descripcion','like', '%'. $search['des'].'%');
        }
    }
        
            $ubicaciones=$ubicaciones ->offset(($page-1)*$paginate)
            ->orderBy($column, $direction)
            ->get();

        return response()->json(array(
            'data'=> $ubicaciones,
            'total' => count($counts),
        ), 200);
    }
    
    public function createUbicaciones(Request $request){
        $body = $request->all();
        $ubicaciones = Ubicaciones::where('ubi_descripcion', $body['nombre'])->first();

        if(isset($ubicaciones) == false){
            Ubicaciones::create([
                'ubi_id' => $body['codigo'],
                'ubi_descripcion' => $body['nombre']
             ]);
             return response()->json(array(
                'data'=> "Se ha creado exitosamente",
            ), 200);
        }
        else{
            return response()->json(array(
                'data'=> "Este esta ubicacion ya existe",
            ), 400);
        }
    }

}
