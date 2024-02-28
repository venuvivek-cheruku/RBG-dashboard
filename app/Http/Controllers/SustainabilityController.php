<?php

namespace App\Http\Controllers;

use App\Models\Sustainability;
use Illuminate\Http\Request;

class SustainabilityController extends Controller
{
    public function index()
    {
        return Sustainability::all();
    }

    public function store(Request $request)
    {
        $sustainability = Sustainability::create($request->all());
        return response()->json($sustainability, 201);
    }

    public function show(Sustainability $sustainability)
    {
        return $sustainability;
    }

    public function update(Request $request, Sustainability $sustainability)
    {
        $sustainability->update($request->all());
        return response()->json($sustainability, 200);
    }

    public function destroy(Sustainability $sustainability)
    {
        $sustainability->delete();
        return response()->json(null, 204);
    }
}