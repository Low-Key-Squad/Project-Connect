<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthControler;
use App\Http\Controllers\Api\ProfileControler;
use App\Http\Controllers\Api\SwipeControler;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout',[AuthControler:: class , 'logout']);
    Route::post('/matches',[ProfileControler:: class , 'WithWho']);
    Route::get('/name/{id}',[ProfileControler:: class , 'GetName']);
    Route::post('/signup',[AuthControler:: class , 'signup']);
    Route::post('/login',[AuthControler:: class , 'login']);
    Route::post('/save',[ProfileControler::class,'savechange']);
    Route::get('/prof', [ProfileControler::class, 'getProfilePhoto']);
    Route::get('/getprof', [ProfileControler::class, 'getProfile']);
    Route::post('/addmatch',[SwipeControler:: class , 'AddtoMatch']);
    Route::post('/ismatch',[SwipeControler:: class , 'IsMatch']);
    Route::post('/createmessage', [ProfileControler::class, 'createMessage']);
    Route::post('/reciver', [ProfileControler::class, 'chatReceiver']);
    Route::post('/user2', [ProfileControler::class, 'getUser2']);
    Route::get('/history', [ProfileControler::class, 'getChatHistory']);
    Route::post('/deletematch', [ProfileControler::class, 'Delete']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

});


Route::post('/signup',[AuthControler:: class , 'signup']);
Route::post('/login',[AuthControler:: class , 'login']);

Route::post('/save',[ProfileControler::class,'savechange']);
Route::get('/prof', [ProfileControler::class, 'getProfilePhoto']);
Route::get('/getprof', [ProfileControler::class, 'getProfile']);
Route::post('/addmatch',[SwipeControler:: class , 'AddtoMatch']);
Route::post('/ismatch',[SwipeControler:: class , 'IsMatch']);
Route::post('/createmessage', [ProfileControler::class, 'createMessage']);
Route::post('/reciver', [ProfileControler::class, 'chatReceiver']);
Route::get('/history', [ProfileControler::class, 'getChatHistory']);
Route::post('/user2', [ProfileControler::class, 'getUser2']);
Route::post('/deletematch', [ProfileControler::class, 'Delete']);
Route::get('/name/{id}',[ProfileControler:: class , 'GetName']);

