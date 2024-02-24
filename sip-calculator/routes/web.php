<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use App\Http\Controllers\SIPController;

Route::GET('/sip/calculator', [SIPController::class, 'showCalculator'])->name('sip.calculator');
Route::POST('/sip/calculate', [SIPController::class, 'calculateSIP'])->name('sip.calculate');
Route::GET('/getSipData', [SIPController::class, 'getSipData'])->name('get.SipData');
Route::get('/sip/calculator', 'App\Http\Controllers\SIPController@showCalculator')->name('sip.calculator');

use App\Http\Controllers\LumpSumController;

Route::GET('/lumpsum/calculator', [LumpSumController::class, 'showCalculator'])->name('lumpsum.calculator');
Route::POST('/lumpsum/calculate', [LumpSumController::class, 'calculateLumpSum'])->name('lumpsum.calculate');




