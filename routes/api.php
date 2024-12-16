<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTaskController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'users'], function () {
    Route::post('login', [UserController::class, 'login']);
    Route::post('sign-in', [UserController::class, 'signIn']);
});

Route::group(['prefix' => 'tasks'], function () {
    Route::post('new', [TaskController::class, 'store']);
    Route::get('list', [TaskController::class, 'list']);
    Route::put('update/{id}', [TaskController::class, 'update']);
    Route::get('get/{id}', [TaskController::class, 'get']);
});

Route::group(['prefix' => 'user/{userId}/tasks'], function () {
    Route::post('/', [UserTaskController::class, 'store']);
    Route::get('/', [UserTaskController::class, 'getTasksByUser']);
});
