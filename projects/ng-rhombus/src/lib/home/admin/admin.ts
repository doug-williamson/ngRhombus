import { Component, OnInit, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IHome } from '../models/home';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ng-rhombus-home-admin',
  imports: [MatButtonModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class NgRhombusHomeAdminComponent implements OnInit {
  formAdminData = input<IHome | undefined>(undefined);
  cancelEvent = output<void>();
  submitEvent = output<IHome>();

  homeAdminForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    // build once
    this.homeAdminForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // add other fields here...
    });

    // react to input changes (runs when data arrives)
    effect(() => {
      const data = this.formAdminData();
      if (data) {
        this.homeAdminForm.patchValue(data, { emitEvent: false });
      }
    });
  }

  onSubmit() {
    if (this.homeAdminForm.invalid) {
      return;
    }

    const rawData: IHome = this.homeAdminForm.getRawValue();
    let submittedHomeAdmin = new IHome();
    if (this.formAdminData()) {
      submittedHomeAdmin.id = this.formAdminData()!.id;
    }

    submittedHomeAdmin.title = rawData.title;
    submittedHomeAdmin.description = rawData.description;

    this.submitEvent.emit(submittedHomeAdmin);
  }

  onCancelClick() {
    console.log('cancel');
  }
}
