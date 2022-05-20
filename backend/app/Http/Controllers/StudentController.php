<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $a = new AuthController();
        $list_student = $a->students($request);
        return view('is_chef', ['student' => $list_student]);
    }
}
