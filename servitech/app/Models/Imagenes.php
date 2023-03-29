<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imagenes extends Model
{
    protected $table = "imagenes";
    protected $fillable = [
        'img_id',
        'img_descripcion',
        'img_producto_id'
    ];
    public $timestamps = false;

}
