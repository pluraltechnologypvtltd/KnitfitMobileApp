import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private emailComposer: EmailComposer) { }

  ngOnInit() {
  }
  sendMail() {
  	alert("sendMail");

  	let email = {
  to: 'khushboovjvrg018@gmail.com',
  cc: '',
  bcc: ['optimistkhushboo@gmail.com'],
  attachments: [
    /*'file://img/logo.png',
    'res://icon.png',
    'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
    'file://README.pdf'*/
  ],
  subject: 'Cordova Icons',
  body: 'How are you? Nice greetings from Leipzig',
  isHtml: true
}

// Send a text message using default options
this.emailComposer.open(email);

  }
}
