<?php

use App\Http\Controllers\GeneralController;
use App\Http\Controllers\MovimientosController;
use App\Http\Controllers\ProductosController;
use App\Http\Controllers\ProveedoresController;
use App\Http\Controllers\UbicacionesController;
use App\Http\Controllers\NotificacionesController;
use App\Http\Controllers\UserController;
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
Route::post('/loged', [UserController::class, 'authenticate'])->name('loged');
Route::post('/register/client/{type}', [UserController::class, 'registerClient']);
Route::get('/general/download/{id}', [GeneralController::class, 'downloadFormats']);    

//Route::get('/download', [MovimientosController::class, 'generateInvoice']);


Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('/general/list', [GeneralController::class, 'getAllData']);
    Route::get('/general/convert/{from}/{value}', [GeneralController::class, 'converteMoneda']);

    Route::get('/productos/empty', [ProductosController::class, 'getEmptyProductos']);
    Route::post('/productos/array', [ProductosController::class, 'getProductoByCodigoArray']);
    Route::post('/productos/list', [ProductosController::class, 'productos']);
    Route::post('/productos/create', [ProductosController::class, 'createProductos']);
    Route::post('/productos/delete/{codigo}', [ProductosController::class, 'deleteProducto']);
    Route::post('/productos/upload', [ProductosController::class, 'uploadProducto']);
    Route::get('/productos/{codigo}', [ProductosController::class, 'getProductoByCodigo']);

    Route::post('/movimiento/productos', [MovimientosController::class, 'getProductsAll']);
    Route::get('/movimiento/productos/{tipo}', [MovimientosController::class, 'getProductsAllByTipo']);
    Route::post('/movimiento/usuarios', [MovimientosController::class, 'getClientesAll']);
    Route::post('/movimiento/create/venta', [MovimientosController::class, 'createdVenta']);
    Route::post('/movimiento/create/compra', [MovimientosController::class, 'createdBuy']);

    Route::post('/proveedores/list', [ProveedoresController::class, 'listaProveedores']);
    Route::post('/proveedores/create', [ProveedoresController::class, 'createProveedores']);

    Route::post('/ubicaciones/list', [UbicacionesController::class, 'listaUbicaciones']);
    Route::post('/ubicaciones/create', [UbicacionesController::class, 'createUbicaciones']);

    Route::post('/notificaciones/create', [NotificacionesController::class, 'createNotificaciones']);
    Route::post('/notificaciones/list', [NotificacionesController::class, 'listaUbicaciones']);

    Route::post('/verify', [UserController::class, 'verifyUser']);
    Route::post('/logoutWeb', [UserController::class, 'logout']);
    Route::get('/usuarios/{id}', [UserController::class, 'getUserByIdentificacion']);
    Route::get('/usuarios/delete/{id}/{status}', [UserController::class, 'deleteUser']);
    Route::post('/usuarios/all', [UserController::class, 'getAllUsers']);
    Route::post('/usuarios/update', [UserController::class, 'updateUser']);
    Route::post('/usuarios/updateSettings', [UserController::class, 'updateSettingsUser']);
    Route::post('/usuarios/details/{id}', [UserController::class, 'getDetailsUser']);
    Route::post('/register/users/{type}', [UserController::class, 'registerClient']);  
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
