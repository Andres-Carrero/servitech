<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salida extends Model
{
    protected $table = "salidas";
    protected $fillable = [
        'sal_id',
        'sal_fecha',
        'sal_cantidad',
        'sal_precio',
        'sal_entregado',
        'sal_hora',
        'sal_moneda',
        'sal_total',
        'sal_producto_id',
        'sal_movimiento_id'
    ];
    public $timestamps = false;

}
