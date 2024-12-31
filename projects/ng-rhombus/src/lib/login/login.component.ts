import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
	authorizing: boolean = false;

  authService = inject(AuthenticationService);

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
  }

  onSubmit() {
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.email, rawForm.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: () => {
         // something here
        }
      });
  }
}
