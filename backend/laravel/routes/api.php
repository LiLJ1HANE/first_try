<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;

// Public availability routes
Route::get('/rooms/availability-report', [RoomController::class, 'availabilityReport']);
Route::get('/rooms/{id}/availability', [RoomController::class, 'checkAvailability']);

// Additional public room routes
Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);

