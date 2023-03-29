<?php

namespace App\Models;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens;
    protected $table = "users";
    protected $fillable = [
        'usu_photo',
        'usu_nombre',
        'usu_apellido',
        'usu_identificacion',
        'email',
        'password',
        'usu_nacimiento',
        'usu_telefono',
        'usu_direccion',
        'usu_ciudad',
        'usu_departamento',
        'usu_pais',
        'usu_code_verificacion',
        'usu_verificacion',
        'usu_role_id',
        'usu_estado_id'
    ];
    
    public function getJWTIdentifier(){
        return $this->getKey();
    }
    public function getJWTCustomClaims(){
        return [];
    }
}
