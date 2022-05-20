<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\keywordsController;
use App\Http\Controllers\NiveauController;
use App\Http\Controllers\themeController;
use App\Http\Controllers\UniversityController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// public routes  
// 
Route::post('login',[AuthController::class,'login']);
Route::post('forgotpassword',[AuthController::class,'forgotpassword']);




// protected routes 
// 
    Route::post('register',[AuthController::class,'register']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    
    Route::delete('users/delete/{id}', [AuthController::class, 'deleteUser']);
    Route::get('users', [AuthController::class, 'users']);
    Route::get('students/{id?}', [AuthController::class, 'students']);
    Route::get('teachers/{id?}', [AuthController::class, 'teachers']);
    Route::get('companies/{id?}', [AuthController::class, 'company']);
	Route::post('logout',[AuthController::class,'logout']); 
    Route::post('changepassword/{id?}',[AuthController::class,'changepassword']);
    //Route::post('profile/edit',[AuthController::class,'modifyProfile']);
    //Route::get('comite', [AuthController::class, 'comite']);
    //Route::post('chooseComite',[AuthController::class,'chooseComite']);
    //Route::post('removeComite',[AuthController::class,'removeComite']);
    Route::post('levels/add',[NiveauController::class,'create']);
    Route::get('levels',[NiveauController::class,'niveau']);
    Route::delete('levels/delete/{id}',[NiveauController::class,'delete']);
    Route::get ('projects/{id?}' ,[themeController::class,'themes']);
    Route::post('projects/add',[themeController::class,'create']);
    Route::get('projects/mine/{id?}',[themeController::class,'mine']);
    Route::get('projects/all',[themeController::class,'all']);
    Route::put('projects/approve/{id?}',[themeController::class,'approve']);
    Route::delete('projects/delete/{id?}',[themeController::class,'delete']);
});

    