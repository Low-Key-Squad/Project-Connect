<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matchs extends Model
{
    use HasFactory;

    protected $table = 'matches';
    protected $primaryKey = 'id';
    
        protected $fillable = [
            'id',
            'user1_id',
            'user2_id',
        ];
}
