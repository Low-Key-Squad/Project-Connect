<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\ProfileRequest;
use App\Models\Chat;
use App\Models\Para;
use App\Models\Profiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ProfileControler extends Controller
{


    
    public  function savechange(ProfileRequest $request)
    {
        $data = $request->validated();
  
            Profiles::updateOrCreate(
                ['user_id' => $data['user_id']],
                [
                    'name' => $data['name'],
                    'age' => $data['age'],
                    'gender' => $data['gender'],
                    'State' => $data['State'],
                    'description' => $data['description'],
                ]
            );

       
    }


        public function getProfile(Request $request)
        {
            $agemin = $request->query('agemin');
            $agemax = $request->query('agemax');
            $gender = $request->query('gender');
            $state = $request->query('state');
            $userid= $request->query('user_id');
            if($gender!='both'){
            $profiles = Profiles::where('age', '>=', $agemin)
             ->where('age', '<=', $agemax)
             ->where('gender', $gender)
             ->where('state', $state)
             ->where('user_id','!=', $userid)
             ->get();
            }else{
                $profiles = Profiles::where('age', '>=', $agemin)
             ->where('age', '<=', $agemax)
             ->where('state', $state)
             ->where('user_id','!=', $userid)
             ->get();
            }
        
            return response()->json($profiles);
        }
        public function WithWho(Request $request)
    {
        $data = $request->validate(['user1_id' => 'required']);
    
        $matchIds = Para::where('user1_id', $data['user1_id'])
                ->orWhere('user2_id', $data['user1_id'])
                ->join('profiles', function ($join) {
                    $join->on('para.user2_id', '=', 'profiles.user_id')
                         ->orWhere('para.user1_id', '=', 'profiles.user_id');
                })
                ->select('para.id', 'profiles.name')
                ->get();

        return response()->json($matchIds);
    

    }
    public function createMessage(Request $request)
    {
        $data = $request->validate([
            'match_id' => ['required', 'int'],
            'sender_id' => ['required', 'int'],
            'receiver_id' => ['required', 'int'],
            'message' => ['required', 'string'],
        ]);

        $message = Chat::create([
            'match_id' => $data['match_id'],
            'sender_id' => $data['sender_id'],
            'receiver_id' => $data['receiver_id'],
            'message' => $data['message'],
        ]);

        return response()->json($message);
    }

    public function getChatHistory(Request $request)
{
    $matchId = $request->input('match_id');
    $chatHistory = Chat::where('match_id', $matchId)->get();
    
    $response = [];
    foreach ($chatHistory as $chat) {
        $senderId = $chat->sender_id;
        $senderName = Profiles::where('user_id', $senderId)->value('name');
        
        $response[] = [
            'message' => $chat->message,
            'sender_id' => $senderId,
            'name' => $senderName,
        ];
    }
    
    return response()->json($response);
}

    public function chatReceiver(Request $request)
    {
        $matchId = $request->input('match_id');

        return response()->json(['match_id' => $matchId]);

    }
    public function GetName(Request $request)
    {
        $userId = $request->route('id');
        $profile = Profiles::where('user_id', $userId)->first();
    
        if (!$profile) {
            $name = 'NoName';
            return response()->json(['name' => $name]);
        }
    
        $name = $profile->name;
    
        return response()->json(['name' => $name]);
    }

    public function getUser2(Request $request){
        $data = $request->validate([
            'match_id' => ['required', 'int'],
            'user_id' => ['required', 'int'],
        ]);
        $matchId = $data['match_id'];
        $userId = $data['user_id'];

            $secondUser = Para::where('id', $matchId)
                ->where(function ($query) use ($userId) {
                    $query->where('user1_id', '!=', $userId)
                    ->orWhere('user2_id', '!=', $userId);
                }) 
                ->pluck('user2_id')
                ->first();
        

        return response()->json($secondUser);

    }
    public function Delete(Request $request) {
        $id = $request->input('id');
    
        Chat::where('match_id', $id)->delete();
        $deleted = Para::where('id', $id)->delete();
    
        if ($deleted) {
            return response()->json(['message' => 'Match deleted successfully']);
        } else {
            return response()->json(['error' => 'Match not found'], 404);
        }
    }


}