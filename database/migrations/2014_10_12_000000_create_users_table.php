<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('profile_id');
            $table->unsignedBigInteger('user_id');
            $table->string('name', 50);
            $table->string('gender');
            $table->integer('age');
            $table->string('description', 255);
            $table->text('prof')->nullable();
            $table->string('State', 25);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user1_id');
            $table->unsignedBigInteger('user2_id');
            $table->rememberToken();
            $table->timestamps();
        });
        Schema::create('para', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user1_id');
            $table->unsignedBigInteger('user2_id');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('match_id');
            $table->unsignedBigInteger('sender_id');
            $table->unsignedBigInteger('receiver_id');
            $table->unsignedBigInteger('message');
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('match_id')->references('id')->on('para');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('profiles');
        Schema::dropIfExists('matches');
        Schema::dropIfExists('chats');
        
    }
};
