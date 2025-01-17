import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailControlComponent } from './thumbnail-control.component';

describe('ThumbnailControlComponent', () => {
  let component: ThumbnailControlComponent;
  let fixture: ComponentFixture<ThumbnailControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThumbnailControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThumbnailControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
