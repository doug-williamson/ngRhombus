import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRhombusBlogDeleteThumbnailComponent } from './delete-thumbnail.component';

describe('NgRhombusBlogDeleteThumbnailComponent', () => {
  let component: NgRhombusBlogDeleteThumbnailComponent;
  let fixture: ComponentFixture<NgRhombusBlogDeleteThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgRhombusBlogDeleteThumbnailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgRhombusBlogDeleteThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
