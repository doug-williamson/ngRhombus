import { Component, inject, OnInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ng-rhombus-home-admin',
  imports: [MatToolbarModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class NgRhombusHomeAdminComponent implements OnInit {
	homeAdminForm!: FormGroup
	formBuilder = inject(FormBuilder);

	ngOnInit(): void {
		this.homeAdminForm = this.formBuilder.group({
			title: [''],
	}
}
