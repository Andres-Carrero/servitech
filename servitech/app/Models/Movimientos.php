<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimientos extends Model
{
    protected $table = "movimientos";
    protected $fillable = [
        'mov_id',
        'mov_fecha',
        'mov_cantidad',
        'mov_total',
        'mov_tipo_movimiento_id',
        'mov_usuario_id',
        'mov_cajero_id',
        'mov_hora',
        'mov_moneda',
        'mov_recibido',
        'mov_cambio',
        'mov_total_iva',
        'mov_entregado',
        'mov_iva'
    ];
    public $timestamps = false;

}
