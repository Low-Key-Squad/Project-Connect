<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profiles extends Model
{

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     * 
     * 
     */
    use HasFactory;

    protected $table = 'profiles';
    protected $primaryKey = 'profile_id';
    
        protected $fillable = [
            'profile_id',
            'user_id',
            'name',
            'gender',
            'age',
            'description',
            'prof',
            'State',
            
        ];
    
}
