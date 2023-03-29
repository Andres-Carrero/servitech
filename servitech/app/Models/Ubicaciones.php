<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ubicaciones extends Model
{
    protected $table = "ubicaciones";
    protected $fillable = [
        'ubi_id',
        'ubi_descripcion'
    ];
    public $timestamps = false;

}
