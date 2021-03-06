<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/todo-items', [TodoController::class, 'index']);
Route::post('/todo-items', [TodoController::class, 'store']);
Route::get('/todo-items/{todoItem}', [TodoController::class, 'show']);
Route::post('/todo-items/{todoItem}', [TodoController::class, 'update']);
Route::put('/todo-items/{todoItem}/complete', [TodoController::class, 'complete']);
Route::delete('/todo-items/{todoItem}', [TodoController::class, 'destroy']);
