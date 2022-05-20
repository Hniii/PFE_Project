<?php

namespace App\Http\Controllers;

use App\Models\Cycle;
use App\Models\Promo;
use App\Models\Speciality;
use Illuminate\Http\Request;

class UniversityController extends Controller{
    function university(){
        $cycles = Cycle::all();
        foreach($cycles as $cycle){
            $specialities  = $cycle->speciality;
            foreach($specialities as $speciality){
                $speciality->promo;
            }
        }
        return $cycles;
    }    


    function cycle(Request $req){
        $this->authorize('create',User::class);
        $req->validate([
            'name' => 'required|string'
        ]);
        Cycle::create([
            'name' => $req['name']
        ]);
        return Response(['message'=>'done']);
    }
    function deleteCycle(Request $req){
        $this->authorize('create',User::class);
        $req->validate([
            'cycle_id'=>"integer|required"
        ]);        
        if($cycle=Cycle::find($req['cycle_id'])){
            $cycle->delete();   
            return Response(['message'=>'done']);
        }
        return Response(['message'=>'no cycle with that id found']);
    }


    function speciality(Request $req){
        $this->authorize('create',User::class);
        $req->validate([
            'cycle_id'=>"integer|required",
            'name' => 'required|string'
        ]);       
        if($cycle=Cycle::find($req['cycle_id'])){
            $cycle->speciality()->save(new Speciality(['name'=>$req['name']]));
            return Response(['message'=>'done']);
        }
        return Response(['message'=>'no cycle with that id found']);
    }

    function deleteSpeciality(Request $req){
        $this->authorize('create',User::class);
        $req->validate([
            'speciality_id'=>"integer|required"
        ]);        
        if($spe=Speciality::find($req['speciality_id'])){
            $spe->delete();   
            return Response(['message'=>'done']);
        }
        return Response(['message'=>'no speciality with that id found']);
    }

    function promo(Request $req){
        $this->authorize('create',User::class);
        $req->validate([
            'speciality_id'=>"integer|required",
            'name' => 'required|string'
        ]);       
        if($spe=Speciality::find($req['speciality_id'])){
            $spe->promo()->save(new Promo(['name'=>$req['name']]));
            return Response(['message'=>'done']);
        }
        return Response(['message'=>'no speciality with that id found']);
    }
    function deletePromo(Request $req){
        $this->authorize('create',User::class);
        $req->validate([
            'promo_id'=>"integer|required"
        ]);        
        if($promo=Promo::find($req['promo_id'])){
            $promo->delete();   
            return Response(['message'=>'done']);
        }
        return Response(['message'=>'no promo with that id found']);
    }
}
