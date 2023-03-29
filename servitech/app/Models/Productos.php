<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    protected $table = "productos";
    protected $fillable = [
        'prod_id',
        'prod_nombre',
        'prod_marca',
        'prod_precio_venta',
        'prod_cantidad',
        'prod_linea',
        'prod_ubicacion_id',
        'prod_estado_id',
        'prod_tipo_id',
        'prod_iva'
    ];
    public $timestamps = false;
    protected $guarded = [];
}
