<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('estados')->insert([
            'est_id' => 1,
            'est_descripcion' => 'Activo',
        ]);

        DB::table('estados')->insert([
            'est_id' => 2,
            'est_descripcion' => 'Inactivo',
        ]);

        DB::table('roles')->insert([
            'rol_id' => 1,
            'rol_descripcion' => 'Administrador',
        ]);

        DB::table('roles')->insert([
            'rol_id' => 2,
            'rol_descripcion' => 'Cliente',
        ]);

        User::create([
            'usu_nombre' => 'ADMIN',
            'usu_apellido' => 'GENERAL',
            'usu_identificacion' => 12345,
            'email' => 'admin@servitech.com',
            'password' => bcrypt('12345678'),
            'usu_nacimiento' => '2000/01/01',
            'usu_direccion' => 'Mi Casa',
            'usu_ciudad' => 'Bogota D.C',
            'usu_departamento' => 'Bogota D.C',
            'usu_pais' => 'Colombia',
            'usu_verificacion' => 1,
            'usu_telefono' => 3214567890,
            'usu_role_id' => 1,
            'usu_estado_id' => 1,
        ]);

        

    }
}
