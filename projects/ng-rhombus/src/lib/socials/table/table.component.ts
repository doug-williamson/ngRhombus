import { Component, input, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ISocial, NgRhombusSocialsService, SocialsSource } from '../socials.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'ng-rhombus-socials-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatSelectModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class NgRhombusSocialsTableComponent {
  socials = input<ISocial[]>([]);
  displayedColumns = ['id', 'source', 'url', 'actions'];

  // Dropdown options
  socialTypeOptions = [
    { label: 'Twitch', value: SocialsSource.Twitch },
    { label: 'YouTube', value: SocialsSource.YouTube },
    { label: 'Instagram', value: SocialsSource.Instagram },
    { label: 'TikTok', value: SocialsSource.TikTok },
    { label: 'Bluesky', value: SocialsSource.Bluesky }
  ];

  private fb = inject(FormBuilder);
  private svc = inject(NgRhombusSocialsService);

  // simple inline form state
  editingId = signal<string | null>(null);
  form = this.fb.group({
    source: this.fb.control<SocialsSource | null>(null, { validators: [Validators.required] }),
    url: this.fb.control<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  startCreate() {
    this.editingId.set('');
    this.form.reset({ source: null, url: '' });
  }
  startEdit(row: ISocial) {
    this.editingId.set(row.id);
    this.form.reset({ source: row.source, url: row.url });
  }
  cancelEdit() {
    this.editingId.set(null);
    this.form.reset({ source: null, url: '' });
  }

  async save() {
    const id = this.editingId();
    const { source, url } = this.form.getRawValue();
    if (!source || !url) return;

    if (id === '') {
      await this.svc.create({ source, url });
    } else {
      await this.svc.update(id!, { source, url });
    }
    this.cancelEdit();
  }

  async delete(row: ISocial) {
    await this.svc.remove(row.id);
  }
}