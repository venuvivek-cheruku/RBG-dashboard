<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

protected $fillable = [
    'material_name',
    'quantity_used',
    'unit_price',
    'total_price',
    'project_association',
    'usage_status',
    'material_type',
    'sustainability_impact',
    'environmental_impact',
];


}