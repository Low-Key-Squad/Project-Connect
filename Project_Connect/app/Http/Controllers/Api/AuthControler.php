<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;


class AuthControler extends Controller
{
    public  function login(LoginRequest $request)
    {
        $credentials=$request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message'=>'Something wrong'
            ]);
        }
        /** @var User $user */
        $user=Auth::user();
        $token=$user->createToken((int)['id' => (String)$user->id])->plainTextToken;
        $res=([
            'user'=>$user,
            'token'=>$token
        ]);
        return response($res)->withCookie(Cookie::make('user_id', $user->id));


    }
        
    public  function signup(SignupRequest $request)
    {
        $data=$request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'email'=> $data['email'],
            'password'=>bcrypt($data['password']),
        ]);
        $token=$user->createToken((Int)['id' => (String)$user->id])->plainTextToken;

        $res=([
            'user'=>$user,
            'token'=>$token
        ]);
        return response($res)->withCookie(Cookie::make('user_id', $user->id));
    }
    
    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete;
        return response('', 204);
    }
}
