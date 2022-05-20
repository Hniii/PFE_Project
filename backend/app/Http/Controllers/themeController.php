<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use App\Models\theme;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class themeController extends Controller
{

    public function create(Request $request)
    {

        $keywords = implode(';', $request->input('keywords'));
        $theme = new theme();
        $theme->title = $request->input('title');
        $theme->summary = $request->input('summary');
        $theme->description = $request->input('description');
        $file = $request->file('file');
        $filename = Str::random(10) . '.' . $file->getClientOriginalExtension();
        $file->move('files/', $filename);
        $theme->file = $filename;
        $theme->keywords = $keywords;
        $theme->niveau_id = $request->input('niveau');
        $theme->state = 'pendding approval';
        $theme->user_id = $request->input('user');

        $theme->save();

        return Response(['message' => 'theme created'], 200);
    }


    public function themes(Request $request, $id = null)
    {

        if (!$id) {
            $themes = theme::where('state', 'approved')->get();
            foreach ($themes as $theme) {
                $theme['keywords'] = explode(';', $theme['keywords']);
            }
        } else {
            $themes = theme::find($id);
            if ($themes !== null) {
                $themes['keywords'] = explode(';', $themes['keywords']);

                return $themes;
            } else {
                abort(404);
            }
        }
        return $themes;
    }
    public function all(Request $request)
    {

        $themes = theme::all();
        foreach ($themes as $theme) {
            $theme['keywords'] = explode(';', $theme['keywords']);
        }
        return $themes;
    }
    public function mine(Request $request, $id)
    {
        $user = User::find($id);

        $themes = DB::table('themes')->where('user_id', $user->id)->get(); //$user->themes();
        if ($themes !== null) {
            foreach ($themes as $theme) {
                $theme->keywords = explode(';', $theme->keywords);
            }
            return $themes;
        } else {
            abort(404);
        }
    }
    public function approve(Request $request, $id)
    {
        $theme = theme::where('id', $id)->update(['state' => 'approved']);
        return response(200);
    }
    public function delete(Request $request, $id)
    {
        $theme = theme::where('id', $id)->update(['state' => 'rejected']);
        return response(200);
    }
}
