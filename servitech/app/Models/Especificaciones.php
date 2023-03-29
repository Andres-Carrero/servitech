<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Especificaciones extends Model
{
    protected $table = "especificaciones";
    protected $fillable = [
        'esp_id',
        'esp_titulo',
        'esp_descripcion',
        'esp_importancia',
        'esp_producto_id'
    ];
    public $timestamps = false;
}
