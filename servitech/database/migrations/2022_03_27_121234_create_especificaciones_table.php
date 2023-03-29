<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEspecificacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('especificaciones', function (Blueprint $table) {
            $table->bigIncrements('esp_id')->unsigned();
            $table->string('esp_titulo', 60);
            $table->string('esp_descripcion', 60);
            $table->integer('esp_importancia');
            $table->unsignedBigInteger('esp_producto_id');
            $table->foreign('esp_producto_id')->references('prod_id')->on('productos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('especificaciones');
    }
}
