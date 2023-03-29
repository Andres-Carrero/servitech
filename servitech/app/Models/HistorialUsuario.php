<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialUsuario extends Model
{
    protected $table = "historial_usuarios";
    protected $fillable = [
        'his_id',
        'his_plataforma',
        'his_navegador',
        'his_version_navegador',
        'his_sistema_operativo',
        'his_version_sistema_operativo',
        'his_fecha',
        'his_hora',
        'his_informacion',
        'his_cambio_anterior',
        'his_cambio_nuevo',
        'his_historial_id',
        'his_usuario_id'
    ];
    public $timestamps = false;
}
