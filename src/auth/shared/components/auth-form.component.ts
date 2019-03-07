import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})

export class AuthFormComponent {
  error: boolean = false;

  constructor(private router: Router) { }

  login(event: FormGroup) {
    const { user, password } = event.value;
    if (user === 'admin' && password === 'admin') {
      sessionStorage.setItem('user', JSON.stringify({ auth: true }));
      event.reset();
      this.router.navigate(['/users']);
    } else {
      this.error = true;
    }
  }
}
