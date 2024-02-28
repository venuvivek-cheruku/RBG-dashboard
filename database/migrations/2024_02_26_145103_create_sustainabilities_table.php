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
        Schema::create('sustainabilities', function (Blueprint $table) {
           $table->id();
            $table->string('project_name');
            $table->decimal('carbon_emissions', 10, 2);
            $table->decimal('water_usage', 10, 2);
            $table->decimal('energy_consumption', 10, 2);
            $table->decimal('waste_generation', 10, 2);
            $table->string('renewable_energy_integration');
            $table->string('sustainable_materials_used');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sustainabilities');
    }
};