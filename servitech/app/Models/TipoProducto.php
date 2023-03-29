<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoProducto extends Model
{
    protected $table = "tipo_productos";
    protected $fillable = [
        'tipr_id',
        'tipr_descripcion',
    ];
    public $timestamps = false;
}
