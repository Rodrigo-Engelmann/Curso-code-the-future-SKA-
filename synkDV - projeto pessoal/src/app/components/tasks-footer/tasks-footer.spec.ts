import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksFooter } from './tasks-footer';

describe('TasksFooter', () => {
  let component: TasksFooter;
  let fixture: ComponentFixture<TasksFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
