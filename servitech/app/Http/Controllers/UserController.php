<?php

namespace App\Http\Controllers;

use ADP\Helpers\SiteHelper;
use App\Models\HistorialUsuario;
use App\Models\Movimientos;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function logout(Request $request){
        $user = JWTAuth::parseToken()->authenticate();

        //$invalidate = JWTAuth::parseToken();

        //invalidate
        return response()->json(array(
            'data' => $user,
            'create' => false
        ), 200);

    }

    public function authenticate(Request $request){
        $credentials = $request->only('email', 'password');
        $validator = Validator::make($credentials, [
            'email' => 'required',
            'password' => 'required'
        ]);

        if(!$validator->fails()){
            try {
                if(! $token = JWTAuth::attempt($credentials)){
                    return response()->json(array(
                        'msg'=> 'Credendiales invalidas',
                        'loged' => false,
                    ), 400);
                }
            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
                return response()->json(array(
                    'msg'=> $e->getMessage(),
                    'loged' => false,
                ), 500);
            }

            $user = User::where('email', $request->only('email'))->first([
                'id', 'usu_nombre', 'usu_apellido', 'usu_nacimiento', 'usu_identificacion', 'usu_telefono', 
                'email', 'usu_role_id', 'usu_estado_id', 'usu_verificacion', 'usu_tema', 'usu_direccion'
            ]);

            if($user['usu_estado_id'] == 1){
                $device = $request->all()['device'];
                $infoTime = $request->all()['infoDate'];

                HistorialUsuario::create([
                    'his_plataforma' => $device['userAgent'],
                    'his_navegador' => $device['browser'],
                    'his_version_navegador' => $device['browser_version'],
                    'his_sistema_operativo' => $device['os'],
                    'his_version_sistema_operativo' => $device['os_version'],
                    'his_fecha' => $infoTime['date'],
                    'his_hora' => $infoTime['time'],
                    'his_informacion' => ''.compact('token')['token'],
                    'his_historial_id' => 1,
                    'his_usuario_id' => $user['id']
                ]);

                return response()->json(array(
                    'msg'=> 'Iniciando Sesion',
                    'token' => compact('token')['token'],
                    'data' => $user,
                    'expired' => env('JWT_TTL'),
                    'role' => $user['usu_role_id'],
                    'loged' => true,
                ), 200);
            }else{
                return response()->json(array(
                    'msg'=> 'Usuario desahabilitado',
                    'loged' => false,
                ), 400);
            }
        }else{
            return response()->json(array(
                'msg'=> 'Debe ingresar el email o la contraseña',
                'loged' => false,
            ), 400);
        }
    }

    public function registerClient(Request $request, $type){
        $validate = User::where('usu_identificacion', $request->all()['identificacion'])
            ->orWhere('email', $request->all()['email'])
            ->orWhere('usu_telefono', $request->all()['telefono'])
            ->first();

        if(isset($validate) == false){
            if(!$request->all()['img']){
                $img = null;
            }else{
                $img = SiteHelper::savePhotos($request->all()['img'], 'user_'.$request->all()['identificacion'], 'usuarios');
            }

            $device = $request->all()['device'];
            $infoTime = $request->all()['infoDate'];
            
            User::create([
                'usu_photo' => $img,
                'usu_nombre' => $request->all()['nombres'],
                'usu_apellido' => $request->all()['apellidos'],
                'usu_identificacion' => $request->all()['identificacion'],
                'email' => $request->all()['email'],
                'password' => $request->all()['password'],
                'usu_nacimiento' => $request->all()['nacimiento'],
                'usu_telefono' => $request->all()['telefono'],
                'usu_direccion' => $request->all()['direccion'],
                'usu_ciudad' => $request->all()['ciudad'],
                'usu_departamento' => $request->all()['departamento'],
                'usu_pais' => $request->all()['pais'],
                'usu_role_id' => $request->all()['rol'],
                'usu_code_verificacion' => $request->all()['codigo'],
                'usu_verificacion' => 0,
                'usu_estado_id' => 1,
            ]);

            if($type == 2){
                SiteHelper::sendMail('mails.registerUser', $request->all(), $request->all()['email'], "Contraseña - Servitech");
            }
            SiteHelper::sendMail('mails.verifyUser', $request->all(), $request->all()['email'], "Codigo de verificación - Servitech");
            
            $find = User::where('usu_identificacion', $request->all()['identificacion'])
                ->orWhere('email', $request->all()['email'])
                ->orWhere('usu_telefono', $request->all()['telefono'])
                ->first();

            HistorialUsuario::create([
                'his_plataforma' => $device['userAgent'],
                'his_navegador' => $device['browser'],
                'his_version_navegador' => $device['browser_version'],
                'his_sistema_operativo' => $device['os'],
                'his_version_sistema_operativo' => $device['os_version'],
                'his_fecha' => $infoTime['date'],
                'his_hora' => $infoTime['time'],
                'his_informacion' => $request->all()['info'],
                'his_cambio_nuevo' => $img,
                'his_historial_id' => 2,
                'his_usuario_id' => $find['id']
            ]);

        }else{
            return response()->json(array(
                'data' => 'Ya existe un usuario con el mismo telefono, email o identificación',
                'create' => false
            ), 200);
        }

        return response()->json(array(
            'data' => 'Se guardo correctamente',
            'create' => true
        ), 200);
    }

    public function deleteUser(Request $request, $id, $status){
        $find = User::where('usu_identificacion', $id)->first(['id', 'usu_estado_id']);

        $historial = HistorialUsuario::where('his_usuario_id', $find['id'])
            ->latest('his_fecha')
            ->latest('his_hora')
            ->take(1)
            ->get([
                'his_plataforma', 'his_navegador', 'his_version_navegador', 
                'his_sistema_operativo', 'his_version_sistema_operativo'
            ])[0];

        User::where('usu_identificacion', $id)->update([
            'usu_estado_id' => $status
        ]);

        if($status == 1){
            $s = 8;
        }else{
            $s = 5;
        }

        HistorialUsuario::create([
            'his_plataforma' => $historial['his_plataforma'],
            'his_navegador' => $historial['his_navegador'],
            'his_version_navegador' => $historial['his_version_navegador'],
            'his_sistema_operativo' => $historial['his_sistema_operativo'],
            'his_version_sistema_operativo' => $historial['his_version_sistema_operativo'],
            'his_fecha' => date('Y-m-d'),
            'his_hora' => date('H:i:s'),
            'his_informacion' => json_encode(['id' => $id, 'usu_estado_id' => $status]),
            'his_cambio_anterior' => json_encode($find),
            'his_cambio_nuevo' => json_encode(['id' => $id, 'usu_estado_id' => $status]),
            'his_historial_id' => $s,
            'his_usuario_id' => $find['id']
        ]);

        return response()->json(array(
            'data' => 'Se elimino usuario'
        ), 200);
    }

    public function verifyUser(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        $decryp = Hash::check($request->all()['number'], $user->usu_code_verificacion);

        if($decryp){
            $device = $request->all()['device'];
            $infoTime = $request->all()['infoDate'];

            User::where('id', $user->id)->update([
                'usu_verificacion' => 1,
                'usu_code_verificacion' => null
            ]);

            HistorialUsuario::create([
                'his_plataforma' => $device['userAgent'],
                'his_navegador' => $device['browser'],
                'his_version_navegador' => $device['browser_version'],
                'his_sistema_operativo' => $device['os'],
                'his_version_sistema_operativo' => $device['os_version'],
                'his_fecha' => $infoTime['date'],
                'his_hora' => $infoTime['time'],
                'his_informacion' => $request->all()['info'],
                'his_cambio_anterior' => json_encode(['id' => $user->id, 'usu_verificacion' => 0]),
                'his_cambio_nuevo' => json_encode(['id' => $user->id, 'usu_verificacion' => 1]),
                'his_historial_id' => 4,
                'his_usuario_id' => $user->id
            ]);
        }
        
        return response()->json(array(
            'data' => $decryp
        ), 200);
    }

    public function getDetailsUser(Request $request, $id){
        $userId = User::where('usu_identificacion', $id)->first(['id', 'usu_role_id']);
        $counts = Movimientos::where('mov_usuario_id', $userId->id)->where('mov_tipo_movimiento_id', 2)->get();

        $paginate = $request->all()['paginate'];
        $page = $request->all()['page'];
        $column = $request->all()['column'];
        $direction = $request->all()['direction'];


        $movs = Movimientos::where('mov_usuario_id', $userId->id)
        ->where('mov_tipo_movimiento_id', 2)
        ->limit($paginate)->offset(($page-1)*$paginate)
        ->orderBy($column, $direction)
        ->get([
            'mov_id', 'mov_fecha', 'mov_hora', 'mov_total', 'mov_total_iva', 'mov_cambio', 'mov_recibido', 'mov_iva',
            'mov_cantidad', 'mov_recibido', 'mov_cambio'
        ]);

        $sales = [];
        $counts1 = [];

        if($userId->usu_role_id == 1){
            $paginate2 = $request->all()['paginate2'];
            $page2 = $request->all()['page2'];
            $column2 = $request->all()['column2'];
            $direction2 = $request->all()['direction2'];

            $counts1 = Movimientos::where('mov_cajero_id', $userId->id)->where('mov_tipo_movimiento_id', 3)->get();

            $sales = Movimientos::where('mov_cajero_id', $userId->id)
                ->where('mov_tipo_movimiento_id', 3)
                ->limit($paginate2)->offset(($page2-1)*$paginate2)
                ->orderBy($column2, $direction2)
                ->get([
                    'mov_id', 'mov_fecha', 'mov_hora', 'mov_total', 'mov_total_iva', 'mov_cambio', 'mov_recibido', 'mov_iva',
                    'mov_cantidad', 'mov_recibido', 'mov_cambio', 'mov_moneda'
                ]);
        }


        return response()->json(array(
            'shopping' => $movs,
            'totalShopping' => count($counts),
            'sales' => $sales,
            'totalSales' => count($counts1),
        ), 200);
    }

    public function updateSettingsUser(Request $request){
        User::where('usu_identificacion', $request->all()['ide'])
        ->update([
            'usu_tema' => $request->all()['theme'],
        ]);

        return response()->json(array(
            'data' => 'Se guardaron correctamente los cambios',
        ), 200);
    }

    public function updateUser(Request $request){
        $find = User::where('usu_identificacion', $request->all()['identificacion'])
            ->orWhere('email', $request->all()['email'])
            ->orWhere('usu_telefono', $request->all()['telefono'])
            ->first([
                'usu_nombre', 'usu_apellido', 'email', 'usu_nacimiento', 'usu_telefono', 'usu_role_id', 'id', 'password'
            ]);

        $device = $request->all()['device'];
        $infoTime = $request->all()['infoDate'];
        User::where('usu_identificacion', $request->all()['identificacion'])->update([
            'usu_nombre' => $request->all()['nombres'],
            'usu_apellido' => $request->all()['apellidos'],
            'email' => $request->all()['email'],
            'usu_nacimiento' => $request->all()['nacimiento'],
            'usu_telefono' => $request->all()['telefono'],
            'usu_role_id' => $request->all()['rol'],
        ]);

        

        if($request->all()['password'] != null){
            User::where('usu_identificacion', $request->all()['identificacion'])->update([
                'password' => $request->all()['password']
            ]);

            HistorialUsuario::create([
                'his_plataforma' => $device['userAgent'],
                'his_navegador' => $device['browser'],
                'his_version_navegador' => $device['browser_version'],
                'his_sistema_operativo' => $device['os'],
                'his_version_sistema_operativo' => $device['os_version'],
                'his_fecha' => $infoTime['date'],
                'his_hora' => $infoTime['time'],
                'his_informacion' => $request->all()['info'],
                'his_cambio_anterior' => $find['password'],
                'his_cambio_nuevo' => $request->all()['password'],
                'his_historial_id' => 4,
                'his_usuario_id' => $find['id']
            ]);
        }

        if($request->all()['img'] != null){
            $UrlImg = SiteHelper::savePhotos($request->all()['img'], 'user_'.$request->all()['identificacion'], 'usuarios');

            User::where('usu_identificacion', $request->all()['identificacion'])->update([
                'usu_photo' => $UrlImg
            ]);
  
        }

            HistorialUsuario::create([
                'his_plataforma' => $device['userAgent'],
                'his_navegador' => $device['browser'],
                'his_version_navegador' => $device['browser_version'],
                'his_sistema_operativo' => $device['os'],
                'his_version_sistema_operativo' => $device['os_version'],
                'his_fecha' => $infoTime['date'],
                'his_hora' => $infoTime['time'],
                'his_informacion' => $request->all()['info'],
                'his_cambio_anterior' => json_encode($find),
                'his_cambio_nuevo' => $request->all()['info'],
                'his_historial_id' => 3,
                'his_usuario_id' => $find['id']
            ]);

        return response()->json(array(
            'data' => 'Se actualizo el usuario',
        ), 200);
    }

    public function getUserByIdentificacion(Request $request, $id){
        $user = User::where('usu_identificacion', $id)->first([
            'usu_photo', 'usu_nombre', 'usu_apellido', 'usu_identificacion', 'email',
            'usu_nacimiento', 'usu_telefono', 'usu_role_id', 'usu_estado_id', 'usu_direccion',
            'usu_ciudad', 'usu_departamento', 'usu_pais'
        ]);

        return response()->json(array(
            'data' => $user,
        ), 200);
    }

    public function getAllUsers(Request $request){
        $paginate = $request->all()['paginate'];
        $page = $request->all()['page'];
        $column = $request->all()['column'];
        $direction = $request->all()['direction'];
        $search = $request->all()['search'];

        $users = User::join('estados', 'estados.est_id', '=', 'users.usu_estado_id')
            ->join('roles', 'roles.rol_id', '=', 'users.usu_role_id');
            if(count($search) > 0){
                if(isset($search['nombre'])){
                    $users = $users->where('usu_nombre', 'like', '%'.$search['nombre'].'%')
                    ->orWhere('usu_apellido', 'like', '%'.$search['nombre'].'%');
                }
                if(isset($search['ide'])){
                    $users = $users->where('usu_identificacion', $search['ide']);
                }
                if(isset($search['email'])){
                    $users = $users->where('email', 'like', '%'.$search['email'].'%');
                }
                if(isset($search['tel'])){
                    $users = $users->where('usu_telefono', $search['tel']);
                }
                if(isset($search['rol']) && $search['rol'] != 0){
                    $users = $users->where('usu_role_id', $search['rol']);
                }
                if(isset($search['status']) && $search['status'] != 0){
                    $users = $users->where('usu_estado_id', $search['status']);
                }
            }
            $users = $users->limit($paginate)->offset(($page-1)*$paginate)
            ->orderBy($column, $direction)
            ->get([
                'usu_nombre', 'usu_apellido', 'usu_identificacion', 'email',
                'usu_telefono', 'rol_descripcion', 'est_descripcion', 'usu_estado_id'
            ]);

            $counts = User::join('estados', 'estados.est_id', '=', 'users.usu_estado_id')
            ->join('roles', 'roles.rol_id', '=', 'users.usu_role_id');
            if(count($search) > 0){
                if(isset($search['nombre'])){
                    $counts = $counts->where('usu_nombre', 'like', '%'.$search['nombre'].'%')
                    ->orWhere('usu_apellido', 'like', '%'.$search['nombre'].'%');
                }
                if(isset($search['ide'])){
                    $counts = $counts->where('usu_identificacion', $search['ide']);
                }
                if(isset($search['email'])){
                    $counts = $counts->where('email', 'like', '%'.$search['email'].'%');
                }
                if(isset($search['tel'])){
                    $counts = $counts->where('usu_telefono', $search['tel']);
                }
                if(isset($search['rol']) && $search['rol'] != 0){
                    $counts = $counts->where('usu_role_id', $search['rol']);
                }
                if(isset($search['status']) && $search['status'] != 0){
                    $counts = $counts->where('usu_estado_id', $search['status']);
                }
            }
            $counts = $counts->get(['usu_identificacion']);
        
        return response()->json(array(
            'data' => $users,
            'total' => count($counts),
        ), 200);
    } 

}
