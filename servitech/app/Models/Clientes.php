<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clientes extends Model
{
    protected $table = "clientes";
    protected $fillable = [
        'cli_id',
        'cli_nombre',
        'cli_apellido',
        'cli_identificacion',
        'cli_email',
        'cli_telefono'
    ];
}
