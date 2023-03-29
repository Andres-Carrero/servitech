<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo_movimiento extends Model
{
    protected $table = "tipo_movimientos";
    protected $fillable = [
        'tip_id',
        'tip_descripcion'
    ];
}
