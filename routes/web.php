<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function(){
    return view('main');
});

// Маршрут для получения списка всех доступных пользователю карточек
Route::post('ajax/get-cards', 'AjaxController@getCards');

// Маршрут для обработки запроса на добавление новой карточки
Route::post('ajax/add-card', 'AjaxController@addCard');