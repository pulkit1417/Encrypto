import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordManagerService } from '../../services/password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  isError: boolean = false;

  constructor(private passwordManagerService: PasswordManagerService, private router: Router){}

  onSubmit() {
    this.passwordManagerService.login(this.loginForm.value.email!, this.loginForm.value.password!)
    .then(() =>{
      this.router.navigate(['/site-list']);
    }).catch(err =>{
      this.isError = true;
    })
  }
}
