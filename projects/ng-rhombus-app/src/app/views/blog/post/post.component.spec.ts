import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
<<<<<<< HEAD:projects/ng-rhombus-app/src/app/views/blog/post/post.component.spec.ts
=======
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
<<<<<<< HEAD
=======
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90:projects/ng-rhombus-app/src/app/views/blog/list/list.component.spec.ts
=======
>>>>>>> bf6c7c8009d2a8b38d1d2929e30c294d0ad71b90
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
