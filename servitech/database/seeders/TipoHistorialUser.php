<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoHistorialUser extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_historial_usuarios')->insert([
            'thu_id' => 1,
            'thu_descripcion' => 'Iniciar Sesion',
        ]);

        DB::table('tipo_historial_usuarios')->insert([
            'thu_id' => 2,
            'thu_descripcion' => 'Nuevo',
        ]);

        DB::table('tipo_historial_usuarios')->insert([
            'thu_id' => 3,
            'thu_descripcion' => 'Actualizar Informacion',
        ]);

        DB::table('tipo_historial_usuarios')->insert([
            'thu_id' => 4,
            'thu_descripcion' => 'Actualizar Contraseña',
        ]);

        DB::table('tipo_historial_usuarios')->insert([
            'thu_id' => 5,
            'thu_descripcion' => 'Eliminar',
        ]);

        DB::table('tipo_historial_usuarios')->insert([
            'thu_id' => 6,
            'thu_descripcion' => 'Cerrar Sesion',
        ]);

        DB::table('tipo_historial_usuarios')->insert([
            'thu_id' => 7,
            'thu_descripcion' => 'Verificacion',
        ]);

        DB::table('tipo_historial_usuarios')->insert([
            'thu_id' => 8,
            'thu_descripcion' => 'Restaurar',
        ]);
        
    }
}
