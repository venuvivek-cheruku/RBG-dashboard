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
        Schema::create('projects', function (Blueprint $table) {
           $table->id();
            $table->string('project_name');
            $table->decimal('cost', 10, 2);
            $table->decimal('duration', 10, 2);
            $table->decimal('profit', 10, 2);
            $table->decimal('revenue', 10, 2);
            $table->decimal('roi', 10, 2);
            $table->string('client_satisfaction');
            $table->decimal('efficiency', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};