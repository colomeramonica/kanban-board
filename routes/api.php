<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => '/users'], function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/sign-in', [UserController::class, 'signIn']);
});

Route::group(['prefix' => '/tasks'], function () {
    Route::get('/', [TaskController::class, 'list']);
    Route::get('/{id}', [TaskController::class, 'get']);
    Route::post('/new', [TaskController::class, 'store']);
    Route::put('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'delete']);
});
