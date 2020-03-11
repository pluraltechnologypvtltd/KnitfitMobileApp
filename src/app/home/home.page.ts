import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from  '@angular/forms';
import { Facebook,FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private rest:ApiService,private facebook:Facebook,private googlePlus: GooglePlus,private router:Router) {}
  todo = {}
  logForm(forms:NgForm) {
    console.log("forms: ",forms.form.value)
    console.log((forms.form.value.password))
     this.rest.createLogin(forms.form.value.email,forms.form.value.password).subscribe((response) => {
    	console.log("createLogin: ",response)
    	console.log("createLogin: ",response.message)
      if(response.message == 200) {
         console.log("user data: ",JSON.stringify(response.data))
         localStorage.setItem('access_token',response.data.access_token)
         this.router.navigateByUrl('/dashboard');
      }
    	
    	/*if(response.status == 'success') {
    		alert(response.msg)
    	}*/
    })
  }
  facebookLogin() {
    this.facebook.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));
  }

  googleLogin() {
    this.googlePlus.login({})
  .then(res => console.log("google login :"+res))
  .catch(err => console.error("google login errs: "+err));
  }
}
