import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgRhombusAuthenticationService } from '../../services/authentication.service';
import { NgRhombusLoadingContainerComponent } from '../loading-container/loading-container.component';
import { MatIconModule } from '@angular/material/icon';

export interface ILoginCredentials {
	email: string;
	password: string;
}

@Component({
	selector: 'ng-rhombus-login',
	imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, NgRhombusLoadingContainerComponent],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class NgRhombusLoginComponent implements OnInit {
	public loginForm!: FormGroup;
	authorizing: boolean = false;

	title = input<string>('');
	loading = input<boolean>(false);
	onSubmit = output<ILoginCredentials>();

	public hidePassword = signal(true);

	authService = inject(NgRhombusAuthenticationService);

	constructor(private fb: FormBuilder, private router: Router) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}

	onSubmitForm() {
		const rawForm: ILoginCredentials = this.loginForm.getRawValue();
		this.onSubmit.emit(rawForm);
	}
}
