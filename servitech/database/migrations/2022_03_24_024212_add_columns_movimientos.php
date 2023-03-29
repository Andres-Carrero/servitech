<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsMovimientos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('movimientos', function (Blueprint $table) {
            $table->time('mov_hora')->after('mov_fecha')->nullable();
            $table->string('mov_moneda', 5)->nullable();
            $table->integer('mov_recibido')->nullable();
            $table->integer('mov_cambio')->after('mov_recibido')->nullable();
            $table->integer('mov_total_iva')->after('mov_total')->nullable();
            $table->string('mov_entregado', 5)->nullable();
            $table->integer('mov_iva')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
