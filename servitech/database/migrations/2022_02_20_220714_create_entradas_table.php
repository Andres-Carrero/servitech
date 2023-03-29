<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntradasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entradas', function (Blueprint $table) {
            $table->bigIncrements('ent_id')->unsigned();
            $table->date('ent_fecha');
            $table->integer('ent_cantidad');
            $table->integer('ent_precio');
            $table->integer('ent_total');
            $table->unsignedBigInteger('ent_proveedor_id');
            $table->unsignedBigInteger('ent_producto_id');
            $table->unsignedBigInteger('ent_movimiento_id');
            $table->foreign('ent_movimiento_id')->references('mov_id')->on('movimientos');
            $table->foreign('ent_producto_id')->references('prod_id')->on('productos');
            $table->foreign('ent_proveedor_id')->references('prov_id')->on('proveedores');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entradas');
    }
}
