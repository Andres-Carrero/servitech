<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoProducto extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

/*Accesorios, Adaptador, Audífonos, Bases Refrigerante, Board, Cables, Camara, Celular, Chasis, 
Codigo (Tarjeta Regalo), Computador, Controles (Mandos), disco duro (Mecanico), disco duro (SSD), 
Forro (Estuche), fuente de poder, keycaps, Kit de limpieza, Laptop, Leds, Licencias, Memorias, 
Micrófono, Monitor, Mouse, Mousepad, Multitoma, Otros, Parlantes, procesador, RAM, Refrigeración, Silla,
switches de teclado, Tablet, Tarjeta gráfica, Teclado, Unidad DVD-ROM, Vidrio templado, Volante*/

        DB::table('tipo_productos')->insert([
            'tipr_id' => 1,
            'tipr_descripcion' => 'Accesorio',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 2,
            'tipr_descripcion' => 'Adaptador',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 3,
            'tipr_descripcion' => 'Audífonos',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 4,
            'tipr_descripcion' => 'Base Refrigerante',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 5,
            'tipr_descripcion' => 'Board',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 6,
            'tipr_descripcion' => 'Cable',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 7,
            'tipr_descripcion' => 'Camara',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 8,
            'tipr_descripcion' => 'Celular',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 9,
            'tipr_descripcion' => 'Chasis',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 10,
            'tipr_descripcion' => 'Codigo (Tarjeta Regalo)',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 11,
            'tipr_descripcion' => 'Computador',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 12,
            'tipr_descripcion' => 'Control (Mando)',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 13,
            'tipr_descripcion' => 'Disco Duro (HDD)',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 14,
            'tipr_descripcion' => 'Disco Duro (SSD)',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 15,
            'tipr_descripcion' => 'Forro (Estuche)',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 16,
            'tipr_descripcion' => 'Fuente de Poder',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 17,
            'tipr_descripcion' => 'Keycaps',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 18,
            'tipr_descripcion' => 'Kit de limpieza',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 19,
            'tipr_descripcion' => 'Laptop',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 20,
            'tipr_descripcion' => 'Leds',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 21,
            'tipr_descripcion' => 'Licencia (Software)',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 22,
            'tipr_descripcion' => 'Memoria',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 23,
            'tipr_descripcion' => 'Micrófono',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 24,
            'tipr_descripcion' => 'Monitor',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 25,
            'tipr_descripcion' => 'Mouse',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 26,
            'tipr_descripcion' => 'Mousepad',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 27,
            'tipr_descripcion' => 'Multitoma',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 28,
            'tipr_descripcion' => 'Otros',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 29,
            'tipr_descripcion' => 'Parlantes',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 30,
            'tipr_descripcion' => 'Procesador',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 31,
            'tipr_descripcion' => 'RAM',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 32,
            'tipr_descripcion' => 'Refrigeración',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 33,
            'tipr_descripcion' => 'Silla',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 34,
            'tipr_descripcion' => 'Switches de Teclado',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 35,
            'tipr_descripcion' => 'Tablet',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 36,
            'tipr_descripcion' => 'Tarjeta Gráfica',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 37,
            'tipr_descripcion' => 'Teclado',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 38,
            'tipr_descripcion' => 'Unidad DVD-ROM',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 39,
            'tipr_descripcion' => 'Vidrio Templado',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 40,
            'tipr_descripcion' => 'Volante',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 41,
            'tipr_descripcion' => 'Impresora',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 42,
            'tipr_descripcion' => 'Sensor',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 43,
            'tipr_descripcion' => 'Escaner',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 44,
            'tipr_descripcion' => 'Router',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 45,
            'tipr_descripcion' => 'Display',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 46,
            'tipr_descripcion' => 'Sim Card',
        ]);

        DB::table('tipo_productos')->insert([
            'tipr_id' => 47,
            'tipr_descripcion' => 'Watch',
        ]);
    }
}
