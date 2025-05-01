<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;

Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);
Route::post('/rooms', [RoomController::class, 'store']);
Route::post('/rooms/{id}/reserve', [RoomController::class, 'reserve']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);