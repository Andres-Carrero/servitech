<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class proveedores extends Model
{
    protected $table = "proveedores";
    protected $fillable = [
        'prov_id',
        'prov_nombre',
        'prov_email',
        'prov_telefono'
    ];
    public $timestamps = false;

}
