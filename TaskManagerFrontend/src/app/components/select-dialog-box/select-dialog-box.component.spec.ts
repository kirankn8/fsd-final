import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDialogBoxComponent } from './select-dialog-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExceptionPipe } from 'src/app/pipes/exception.pipe';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AppComponent } from 'src/app/app.component';
import { By } from '@angular/platform-browser';

describe('SelectDialogBoxComponent', () => {
  let component: SelectDialogBoxComponent;
  let fixture: ComponentFixture<SelectDialogBoxComponent>;

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
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
