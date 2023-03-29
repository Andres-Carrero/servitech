<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class tipoMovimientoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipo_movimientos')->insert([
            'tip_id' => 1,
            'tip_descripcion' => 'Inventario',
        ]);

        DB::table('tipo_movimientos')->insert([
            'tip_id' => 2,
            'tip_descripcion' => 'Ventas',
        ]);

        DB::table('tipo_movimientos')->insert([
            'tip_id' => 3,
            'tip_descripcion' => 'Compras',
        ]);

        DB::table('tipo_movimientos')->insert([
            'tip_id' => 4,
            'tip_descripcion' => 'Devolucion por Venta',
        ]);

        DB::table('tipo_movimientos')->insert([
            'tip_id' => 5,
            'tip_descripcion' => 'Devolucion por Compra',
        ]);
    }
}
