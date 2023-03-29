<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial_usuarios', function (Blueprint $table) {
            $table->bigIncrements('his_id')->unsigned();
            $table->string('his_plataforma');
            $table->string('his_navegador');
            $table->string('his_version_navegador');
            $table->string('his_sistema_operativo');
            $table->string('his_version_sistema_operativo');
            $table->date('his_fecha');
            $table->time('his_hora');
            $table->string('his_informacion', 600)->nullable();
            $table->string('his_cambio_anterior', 500)->nullable();
            $table->string('his_cambio_nuevo', 500)->nullable();
            $table->unsignedBigInteger('his_historial_id');
            $table->unsignedBigInteger('his_usuario_id');
            $table->foreign('his_usuario_id')->references('id')->on('users');
            $table->foreign('his_historial_id')->references('thu_id')->on('tipo_historial_usuarios');

           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historial_usuarios');
    }
}
