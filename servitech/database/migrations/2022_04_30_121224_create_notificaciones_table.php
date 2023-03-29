<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificacionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->bigIncrements('not_id')->unsigned();
            $table->string('not_mensaje', 60);
            $table->string('not_tipo', 60);
            $table->integer('not_leido');
            $table->string('not_url');
            $table->date('not_fecha');
            $table->time('not_hora');
            $table->unsignedBigInteger('not_user_id');
            $table->foreign('not_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notificaciones');
    }
}
