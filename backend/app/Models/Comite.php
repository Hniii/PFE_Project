<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comite extends Model
{
    use HasFactory;
    public $table="comite";    

    function teacher(){
        return $this->BelongsTo(Teacher::class);
    }

}