<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use TimeHunter\LaravelGoogleReCaptchaV3\Facades\GoogleReCaptchaV3;
use TimeHunter\LaravelGoogleReCaptchaV3\Validations\GoogleReCaptchaV3ValidationRule;

class ContactController extends Controller
{
    public function get(){
        return Inertia::render('Contact');
    }
    public function post(Request $request, Contact $contact){
        $content = $request->validate([
            'f_name'=> 'required|string|max:20',
            'l_name'=> 'required|string|max:20',
            'email'=> 'required|unique:contacts,email|string|max:35',
            'content'=> 'required|string',
            'gRecaptchaToken'=> [new GoogleReCaptchaV3ValidationRule('contact_us')],
        ]);
        $contact->create($content);
        return redirect()->back();
    }
}
