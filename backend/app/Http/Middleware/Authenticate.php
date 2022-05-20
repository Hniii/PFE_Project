<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Crypt;
use Nette\Utils\Strings;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }
    

    //  public function handle($request, Closure $next, ...$guards){
    //      if($token=$request->cookie('jwt')){
    //          $request->headers->set('Authorization','Bearer '.$token);
    //      }
    //      $this->authenticate($request,$guards);
    //      return $next($request);
    //  }
}
