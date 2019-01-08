import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { ExceptionPipe } from 'src/app/pipes/exception.pipe';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddTaskComponent,
        SearchPipe,
        ExceptionPipe,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
      ],
      providers: [DatePipe],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
