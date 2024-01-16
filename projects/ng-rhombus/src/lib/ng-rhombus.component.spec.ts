import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgRhombusComponent } from './ng-rhombus.component';

describe('NgRhombusComponent', () => {
  let component: NgRhombusComponent;
  let fixture: ComponentFixture<NgRhombusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgRhombusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgRhombusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
