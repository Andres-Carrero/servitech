<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalidasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salidas', function (Blueprint $table) {
            $table->bigIncrements('sal_id')->unsigned();
            $table->date('sal_fecha');
            $table->integer('sal_cantidad');
            $table->integer('sal_precio');
            $table->unsignedBigInteger('sal_producto_id');
            $table->unsignedBigInteger('sal_movimiento_id');
            $table->foreign('sal_movimiento_id')->references('mov_id')->on('movimientos');
            $table->foreign('sal_producto_id')->references('prod_id')->on('productos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('salidas');
    }
}
