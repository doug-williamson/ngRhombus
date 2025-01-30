import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteThumbnailComponent } from './delete-thumbnail.component';

describe('DeleteThumbnailComponent', () => {
  let component: DeleteThumbnailComponent;
  let fixture: ComponentFixture<DeleteThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteThumbnailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
