import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { ExceptionPipe } from 'src/app/pipes/exception.pipe';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { SelectDialogBoxComponent } from '../select-dialog-box/select-dialog-box.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddProjectComponent,
        AddTaskComponent,
        AddUserComponent,
        ViewTaskComponent,
        SearchPipe,
        SelectDialogBoxComponent,
        EditTaskComponent,
        ExceptionPipe,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        AppRoutingModule,
      ],
      providers: [DatePipe],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
