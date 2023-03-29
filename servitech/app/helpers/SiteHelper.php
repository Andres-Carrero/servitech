<?php

namespace ADP\Helpers;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use GuzzleHttp\Client;
use AmrShawky\LaravelCurrency\Facade\Currency;
use App\Models\User;

class SiteHelper
{
    public static function settings()
    {
        return [
            "loging" => empty(Auth::user())
        ];
    }

    public static function verifyToken($token){
        if(!isset($token)){
            return false;
        }

        $tokenVaidate = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1]))));
        $user = User::where('id', $tokenVaidate->sub)->where('usu_estado_id', 1)->where('usu_verificacion', 1)->first(['id']);

        if(!isset($user)){
            return false;
        }

        return $user['id'];
    }

    public static function savePhotos($base64, $nameFile, $storage){
        $files = base64_decode(explode(",", $base64)[1]);
        $format = explode(";", explode("/", explode(",", $base64)[0])[1])[0];
        $defineImg = $nameFile.'.'.$format;
        Storage::disk($storage)->put($defineImg, $files);

        $client = new Client();
        $response = $client->request('POST', 'https://api.imgur.com/3/image', [
            'headers' => [
                'authorization' => 'Client-ID '.env('CLIENT_ID'),
                'content-type' => 'application/x-www-form-urlencoded',
            ],
            'form_params' => [
                'image' => base64_encode(Storage::disk($storage)->get($defineImg))
            ],
        ]);

        $img = data_get(response()->json(json_decode(($response->getBody()->getContents())))->getData(), 'data.link');
        Storage::disk($storage)->delete($defineImg);

        return $img;
    }

    public static function convertMoney($from, $value){
        return Currency::convert()->from($from)->to('COP')->amount($value)->get();
    }


    public static function sendMail($view, $params, $email, $razon){
        $subject = $razon;
        $for = $email;
        Mail::send($view, $params, function($msj) use($subject,$for){
            $msj->from("servitechADSI@gmail.com", "Servitech");
            $msj->subject($subject);
            $msj->to($for);
        });
    }



}