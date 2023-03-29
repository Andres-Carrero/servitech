<?php

namespace App\Http\Controllers;

use App\Models\notificaciones;
use App\Models\User;
use Illuminate\Http\Request;

class NotificacionesController extends Controller
{
    public function createNotificaciones(Request $request){
        $body = $request->all();
        $notificaciones = notificaciones::where('not_id', $body['id'])->first();

        if(isset($notificaciones) == false){
            notificaciones::create([
                'not_id' => $body['codigo'],
                'not_mensaje' => $body['mensaje'],
                'not_tipo' => $body['tipo'],
                'not_leido' => $body['leido'],
                'not_url' => $body['url'],
             ]);
             return response()->json(array(
                'data'=> "Se ha creado exitosamente",
            ), 200);
        }
        else{
            return response()->json(array(
                'data'=> "Esta notificacion ya existe",
            ), 400);
        }
    }

    public function listaNotificaciones(Request $request){
        $counts = Notificaciones::get();

        $paginate = $request->all()['paginate'];
        $page = $request->all()['page'];
        $column = $request->all()['column'];
        $direction = $request->all()['direction'];

        $notificaciones = Notificaciones::limit($request->all()['paginate'])
            ->offset(($page-1)*$paginate)
            ->orderBy($column, $direction)
            ->get();

        return response()->json(array(
            'data'=> $notificaciones,
            'total' => count($counts),
        ), 200);
    }

    public function getListnotificaciones(Request $request){
        $usuarios = User::get(['id', 'usu_nombre', 'usu_apellido',]);

        return response()->json(array(
            'User' => $usuarios,
        ), 200);
    }
}
