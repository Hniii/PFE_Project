<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    protected $fillable = [
            'name',
            'domaine',
            'type',
            'speciality',
            'year',
    ];
    use HasFactory;

    function keywordtheme(){
        return $this->hasMany(keywordtheme::class);
    }    

}
