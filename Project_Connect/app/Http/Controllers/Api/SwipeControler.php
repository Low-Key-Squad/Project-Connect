<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MatchesRequest;
use App\Models\Chat;
use App\Models\Matchs;
use App\Models\Para;

class SwipeControler extends Controller
{
    public  function AddtoMatch(MatchesRequest $request)
    {
        $data=$request->validated();
        Matchs::updateOrCreate(
            ['user1_id' => $data['user1_id'], 'user2_id' => $data['user2_id'] ],
            [
            'user1_id'=> $data['user1_id'],
            'user2_id'=>$data['user2_id'],
            ]
        );

    }
   
    public function IsMatch(MatchesRequest $request){
    $data = $request->validated();
    $jest = false;

    $match1 = Matchs::where('user1_id', $data['user1_id'])
        ->where('user2_id', $data['user2_id'])
        ->first();

    $match2 = Matchs::where('user1_id', $data['user2_id'])
        ->where('user2_id', $data['user1_id'])
        ->first();
    if ($match1 && $match2) {
        Para::updateOrCreate(
            ['user1_id' => $data['user1_id'], 'user2_id' => $data['user2_id'] ],
            [
                'user1_id'=> $data['user1_id'],
                'user2_id'=>$data['user2_id'],
            ]
        );
        $jest=true;
    }
    
    return response(json_encode($jest));
    }
}
