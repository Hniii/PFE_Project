<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Niveau;
use GuzzleHttp\Psr7\Response;

class NiveauController extends Controller{

    public function create(Request $request){
        $request->validate([
            'domaine'=>'string|required',
            'type'=>'string|required',
            'speciality'=>'string|required',
            'year'=>'integer|required',
        ]);

        Niveau::create([
            'name'=>$request['year'].' '.$request['speciality'],
            'domaine'=>$request['domaine'],
            'type'=>$request['type'],
            'speciality'=>$request['speciality'],
            'year'=>$request['year'],
        ]);

        return Response(['message'=>'niveau created'],200);
    }

    public function niveau(){
        return Niveau::all();
    }

    public function delete(Request $request,$id=null){
        if(!$id){
            return Response(404);
        }
        $niveau = Niveau::find($id);
        if(!$niveau){
            return Response(404);
        }
        $niveau->delete();
        return Response(200);
    }

}
