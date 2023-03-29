<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('prod_id')->unsigned();
            $table->string('prod_nombre', 30);
            $table->string('prod_marca', 20);
            $table->integer('prod_precio_venta');
            $table->integer('prod_cantidad');
            $table->integer('prod_linea');
            $table->unsignedBigInteger('prod_ubicacion_id');
            $table->unsignedBigInteger('prod_estado_id');
            $table->unsignedBigInteger('prod_tipo_id');
            $table->foreign('prod_tipo_id')->references('tipr_id')->on('tipo_productos');
            $table->foreign('prod_ubicacion_id')->references('ubi_id')->on('ubicaciones');
            $table->foreign('prod_estado_id')->references('est_id')->on('estados');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
