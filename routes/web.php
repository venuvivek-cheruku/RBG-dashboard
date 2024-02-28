<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/material_quantities', function () {
    return Inertia::render('MaterialQuantities');
})->middleware(['auth', 'verified'])->name('material_quantities');

Route::get('/sustainability_impact', function () {
    return Inertia::render('SustainabilityImpact');
})->middleware(['auth', 'verified'])->name('sustainability_impact');

Route::get('/project_metrics', function () {
    return Inertia::render('ProjectMetrics');
})->middleware(['auth', 'verified'])->name('project_metrics');

Route::get('/users_rights', function () {
    return Inertia::render('UsersAndRights');
})->middleware(['auth', 'verified'])->name('users_rights');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/images/{filename}', 'ImageController@show');

require __DIR__.'/auth.php';