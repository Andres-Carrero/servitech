<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovimientosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movimientos', function (Blueprint $table) {
            $table->bigIncrements('mov_id')->unsigned();
            $table->date('mov_fecha');
            $table->integer('mov_cantidad');
            $table->integer('mov_total');
            $table->unsignedBigInteger('mov_tipo_movimiento_id');
            $table->unsignedBigInteger('mov_usuario_id')->nullable();
            $table->unsignedBigInteger('mov_cajero_id')->nullable();
            $table->foreign('mov_tipo_movimiento_id')->references('tip_id')->on('tipo_movimientos');
            $table->foreign('mov_usuario_id')->references('id')->on('users');
            $table->foreign('mov_cajero_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movimientos');
    }
}
