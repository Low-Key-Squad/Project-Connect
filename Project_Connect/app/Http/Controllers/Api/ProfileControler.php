<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Requests\ProfileRequest;
use App\Models\Chat;
use App\Models\Para;
use App\Models\Profiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Profiler\Profile;

class ProfileControler extends Controller
{


    
    public  function savechange(ProfileRequest $request)
    {
        $data = $request->validated();

        


        if ($request->hasFile('prof')) {
            $file = $request->file('prof');

            
            $path = $file->store('public/profiles');

            
            $fileName = $file->getClientOriginalName();

          
            Profiles::updateOrCreate(
                ['user_id' => $data['user_id']],
                [
                    'name' => $data['name'],
                    'age' => $data['age'],
                    'gender' => $data['gender'],
                    'State' => $data['State'],
                    'description' => $data['description'],
                    'prof' => $path,
                ]
            );

        }
    }

    public function getProfilePhoto(Request $request)
        {
                $userId = $request->query('userId');
                $profile = Profiles::where('user_id', $userId)->first();
                $profImagePath = $profile ? $profile->prof : null;

                return response($profImagePath);
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
                ->get('id',);
        
    
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
}