import { Component, OnInit } from '@angular/core';
//import { NgForm } from  '@angular/forms';
import { ApiService } from '../services/api.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registrationForm: FormGroup;
  constructor(private rest:ApiService, public formBuilder: FormBuilder) { 

this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,  this.emailValidator])],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      terms_and_conditions: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'confirm_password')})
}

  ngOnInit() { }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];
    
    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}
emailValidator(control: FormControl): {[key: string]: any} {
  var emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}

 /* register(forms:NgForm){
  	console.log("registration form: ",forms)
    console.log("registration form2: ",forms.form.value)
    
  }*/

   submitRegistration(value: Object): void {
    console.log(value);
    console.log();
    this.rest.createregister(value['first_name'],value['last_name'],value['username'],value['password'],value['confirm_password'],value['email'],1).subscribe((response) => {
      console.log("createregister: ",response)
      if(response.status == 'success') {
        alert(response.msg)
      }
    })
  }

}
