<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Company;
use Illuminate\Support\Str;
use App\Models\Person;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordMail;
use App\Models\Admin;
use App\Models\Comite;


class AuthController extends Controller
{

    public function register(Request $request)
    {
        $password = Str::random(10);
        // validating user 
        $fields = $request->validate([
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'role' => 'required|string',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'birthday' => 'required|date',
            'birthplace' => 'required|string',
            'gender' => 'required|string',
        ]);
        $user = User::create([
            'phone' => $fields['phone'],
            'email' => $fields['email'],
            'password' => bcrypt($password),
            'address' => $fields['address'],
            'role' => $fields['role'],
            'profilePicture' => 'default-company-profile-picture',
        ]);
        if ($request->role === "admin") {

            $p = $user->person()->save(
                new Person([
                    'firstName' => $request['firstname'],
                    'lastName' => $request['lastname'],
                    'birthDate' => $request['birthday'],
                    'placeOfBirth' => $request['birthplace'],
                    'gender' => $request['gender']
                ])
            );
            $p->admin()->save(new Admin());
        } elseif ($request->role === "company") {
            $c = $user->company()->save(
                new Company([
                    'name' => $fields['firstname'],
                ])
            );
        } else if ($request->role === "student") {

            $p = $user->person()->save(
                new Person([
                    'firstName' => $request['firstname'],
                    'lastName' => $request['lastname'],
                    'birthDate' => $request['birthday'],
                    'placeOfBirth' => $request['birthplace'],
                    'gender' => $request['gender']
                ])
            );
            $p->student()->save(new Student());
        } else {
            $p = $user->person()->save(
                new Person([
                    'firstName' => $request['firstname'],
                    'lastName' => $request['lastname'],
                    'birthDate' => $request['birthday'],
                    'placeOfBirth' => $request['birthplace'],
                    'gender' => $request['gender']
                ])
            );
            $p->teacher()->save(new Teacher());
        }

        if (isset($user)) {
            try {
                Mail::to($user['email'])->send(
                    new PasswordMail(
                        [
                            'title' =>  'Password Confirmatoin',
                            'body' =>  'you have been registred in our site www.gpm.com . To sign into your account use the password : ' . $password
                        ]
                    )
                );
            } catch (\Throwable $th) {
                //throw $th;
                abort(400);
            }

            return response(201);
        } else {
            abort(403);
        }
    }

    public function roles(User $user)
    {
        $roles = [];
        $person = $user->person()->first();
        if (!$person) {
            if ($user->company()->first()) {
                $roles[] = 'company';
            } else {
                return response(["message" => "user deos not have any role"]);
            }
        } else {
            if ($person->admin()->first()) {
                $roles[] = 'admin';
            }

            if ($person->student()->first()) {
                $roles[] = 'student';
            }

            if ($person->teacher()->first()) {
                $roles[] = 'teacher';
                if ($person->teacher()->first()->comite()->first()) {
                    $roles[] = 'comite';
                }
            }
        }
        return $roles;
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        // Check email
        $user = User::where('email', $fields['email'])->first();
        // Check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return abort(403);
        } else {
            $token = $user->createToken($user->id)->plainTextToken;
            $user['roles'] = $this->roles($user);
            return response([
                'token' => $token,
                'user' => $user
            ], 200);
        }
    }
    // get all users or a specific user
    public function users(Request $request)
    {
        $students = $this->students($request);
        $teachers = $this->teachers($request);
        $company = $this->company($request);
        $users = array_merge($students, $teachers);
        $users = array_merge($users, $company);
        return $users;
    }


    public function deleteUser(Request $req, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return Response(['message' => 'user not found'], 400);
        }
        $user->delete();
        return Response(['message' => 'user deleted'], 200);
    }

    public function students(Request $request, $id = null)
    {
        if ($id) {
            $users = [User::find($id)];
        } else {
            $users = User::all();
        }
        $students = [];
        foreach ($users as $user) {
            if ($person = $user->person()->first()) {
                if ($person->student()->first()) {
                    $student = array_merge_recursive(json_decode($user, true), json_decode($person, true));
                    $student['student_id'] = $student['id'][1];
                    $student['role'] = 'student';
                    unset($student['id']);
                    $students[] = $student;
                }
            }
        }
        return  $students;
    }

    public function teachers(Request $request, $id = null)
    {
        if ($id) {
            $users = [User::find($id)];
        } else {
            $users = User::all();
        }
        $students = [];
        foreach ($users as $user) {
            if ($person = $user->person()->first()) {
                if ($person->teacher()->first()) {
                    $student = array_merge_recursive(json_decode($user, true), json_decode($person, true));
                    $student['teacher_id'] = $student['id'][1];
                    $student['role'] = 'teacher';
                    unset($student['id']);
                    $students[] = $student;
                }
            }
        }
        return  $students;
    }
    public function comite(Request $request)
    {
        if ($comite = Comite::all()->first()) {
            $teacher = $comite->teacher()->first();
            $person = $teacher->person()->first();
            $user = $person->user()->first();
            $comite = array_merge_recursive(json_decode($user, true), json_decode($person, true));
            $comite['teacher_id'] = $comite['id'][1];
            unset($comite['id']);
            return $comite;
        }
        return Response(['message' => 'no comite choosen yet']);
    }

    public function company(Request $request, $id = null)
    {
        if ($id) {
            $users = [User::find($id)];
        } else {
            $users = User::all();
        }
        $students = [];
        foreach ($users as $user) {
            if ($company = $user->company()->first()) {
                $student = array_merge_recursive(json_decode($user, true), json_decode($company, true));
                $student['company_id'] = $student['id'][1];
                $student['role'] = 'company';
                unset($student['id']);
                $students[] = $student;
            }
        }
        return  $students;
    }
    // just delete the token for the user comming with that reqeust
    public function logout(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        $request->user()->currentAccessToken()->delete();
        return response(200);
    }


    public function forgotpassword(Request $request)
    {
        $request->validate([
            'email' => 'required|string'
        ]);
        $user = User::where('email', $request['email'])->first();
        if (!$user) {
            return abort(404);
        }
        $password = Str::random(10);
        $user->password = bcrypt($password);
        $user->save();
        try {
            //code...
            Mail::to($user['email'])->send(
            new PasswordMail(
                [
                    'title' =>  'Password Recovery',
                    'body' =>  'your new password : ' . $password
                ]
            )
        );
        } catch (\Throwable $th) {
            //throw $th;
            abort(400);
        }
        
        return response(202);
    }

    function modifyProfile(Request $req)
    {
        $user = $req->user();
        $change = ['email', 'phone', 'profilePicture'];
        for ($i = 0; $i < 3; $i++) {
            if (isset($req[$change[$i]])) {
                $user[$change[$i]] = $req[$change[$i]];
            }
        }
        $user->save();
        return Response(['message' => 'done update'], 200);
    }

    function changepassword(Request $req,$id)
    {
        $req->validate([
            'password' => 'string|required|min:8'
        ]);
        $user = User::find($id);
        $user['password'] = bcrypt($req['password']);
        $user->save();
        return response( 200);
    }

    function chooseComite(Request $req)
    {
        //$this->authorize('viewAny',User::class);
        $req->validate([
            'teacher_id' => 'integer|required'
        ]);
        if (Comite::all()->first()) {
            return Response(['message' => 'remove the old comite first']);
        }
        if ($teacher = Teacher::find($req['teacher_id'])) {
            $teacher->comite()->save(new Comite());
            return Response(['message' => 'done']);
        }
        return Response(['message' => 'no teacher with that id']);
    }

    function removeComite(Request $req)
    {
        $this->authorize('viewAny', User::class);
        if ($com = Comite::all()->first()) {
            $com->delete();
            return Response(['message' => 'done']);
        }
        return Response(['message' => 'no comite to remove']);
    }
}
