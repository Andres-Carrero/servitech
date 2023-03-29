<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table->string('usu_photo')->nullable();
            $table->string('usu_nombre', 15);
            $table->string('usu_apellido', 15);
            $table->bigInteger('usu_identificacion')->unique();
            $table->string('email', 50)->unique();
            $table->string('password', 120);
            $table->string('usu_nacimiento', 50)->nullable();
            $table->string('usu_direccion', 60);
            $table->string('usu_ciudad', 20);
            $table->string('usu_departamento', 20);
            $table->string('usu_pais', 15);
            $table->string('usu_code_verificacion')->nullable();
            $table->integer('usu_verificacion')->default(0);
            $table->bigInteger('usu_telefono')->unique();
            $table->unsignedBigInteger('usu_role_id');
            $table->unsignedBigInteger('usu_estado_id');
            $table->foreign('usu_role_id')->references('rol_id')->on('roles');
            $table->foreign('usu_estado_id')->references('est_id')->on('estados');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
