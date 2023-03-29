<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrada extends Model
{
    protected $table = "entradas";
    protected $fillable = [
        'ent_id',
        'ent_fecha',
        'ent_cantidad',
        'ent_precio',
        'ent_total',
        'ent_proveedor_id',
        'ent_producto_id',
        'ent_movimiento_id',
        'ent_hora',
        'ent_moneda',
        'ent_precio_iva',
        'ent_precio_total_iva'
    ];
    public $timestamps = false;
}
