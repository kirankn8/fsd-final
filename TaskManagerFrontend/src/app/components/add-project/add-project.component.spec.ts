import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { ExceptionPipe } from 'src/app/pipes/exception.pipe';
import { MatDialogModule, MatDialog } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of([])
    };
  }
}

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;
  let dialog: MatDialogMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddProjectComponent,
        SearchPipe,
        ExceptionPipe,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        DatePipe,
        { provide: MatDialog, useClass: MatDialogMock }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;

    dialog = TestBed.get(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('enable Date Fields', () => {
    component.enableDateFields();
    const startDateInput = fixture.debugElement.query(By.css('#start-date')).nativeElement;
    const endDateInput = fixture.debugElement.query(By.css('#end-date')).nativeElement;
    expect(startDateInput.disabled).toBe(false);
    expect(endDateInput.disabled).toBe(false);
  });

  it('disable Date Fields', () => {
    component.disableDateFields();
    const startDateInput = fixture.debugElement.query(By.css('#start-date')).nativeElement;
    const endDateInput = fixture.debugElement.query(By.css('#end-date')).nativeElement;
    expect(startDateInput.disabled).toBe(true);
    expect(endDateInput.disabled).toBe(true);
  });

  it('checkbox should toggle date fields', () => {
    const dateCheckBox = fixture.debugElement.query(By.css('#date-checkbox')).nativeElement;
    dateCheckBox.click();
    const startDateInput = fixture.debugElement.query(By.css('#start-date')).nativeElement;
    const endDateInput = fixture.debugElement.query(By.css('#end-date')).nativeElement;
    expect(startDateInput.disabled).toBe(false);
    expect(endDateInput.disabled).toBe(false);
    dateCheckBox.click();
    expect(startDateInput.disabled).toBe(true);
    expect(endDateInput.disabled).toBe(true);
  });

  it('fetch project', () => {
    component.getProjectList();
  });

  it('project onsubmit', () => {

  });

});
