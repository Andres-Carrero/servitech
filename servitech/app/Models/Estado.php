<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $table = "entradas";
    protected $fillable = [
        'est_id',
        'est_descripcion'
    ];
}
