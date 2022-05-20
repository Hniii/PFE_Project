<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        'firstName',
        'lastName',
        'birthDate',
        'placeOfBirth',
        'gender',
    ];
    use HasFactory;

    function admin(){
        return $this->hasOne(Admin::class);
    }
    
    function teacher(){
        return $this->hasOne(Teacher::class);
    }

    function student(){
        return $this->hasOne(Student::class);
    }

    function user(){
        return $this->belongsTo(User::class);
    }
}
