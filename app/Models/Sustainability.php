<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sustainability extends Model
{
    use HasFactory;

protected $fillable = [
    'project_name',
    'carbon_emissions',
    'water_usage',
    'energy_consumption',
    'waste_generation',
    'renewable_energy_integration',
    'sustainable_materials_used',
];


}