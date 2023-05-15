<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Para extends Model
{
    use HasFactory;

    protected $table = 'para';
    protected $primaryKey = 'id';
    
        protected $fillable = [
            'id',
            'user1_id',
            'user2_id',
        ];
}
