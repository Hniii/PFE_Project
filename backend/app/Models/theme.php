<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class theme extends Model
{
    protected $fillable = [
        'title',
        'summary',
        'description',
        'file',
        'keywords',
        'niveau_id',
        'state',
        'user_id',
    ];

    use HasFactory;
    
    function keywordtheme(){
        return $this->hasMany(keywordtheme::class);
    }    

    function niveau(){
        return $this->belongsTo(Niveau::class);
    }

    function user(){
        return $this->belongsTo(User::class);
    }
    
    
}
