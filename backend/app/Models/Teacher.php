<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model{
        use HasFactory;


    function person(){
        return $this->belongsTo(Person::class);
    }

    function comite(){
        return $this->hasOne(Comite::class);
    }
}
