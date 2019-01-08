import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { ExceptionPipe } from 'src/app/pipes/exception.pipe';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

export function newEvent(eventName: string, bubbles = false, cancelable = false) {
  const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
  evt.initCustomEvent(eventName, bubbles, cancelable, null);
  return evt;
}

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let componentHtml: any;
  let componentTs: any;
  let fixture: ComponentFixture<AddUserComponent>;
  let form: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddUserComponent,
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
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    componentTs = fixture.debugElement.componentInstance;
    componentHtml = fixture.debugElement.nativeElement;

    form = {
      firstName: componentHtml.querySelector('input#first-name') as HTMLInputElement,
      lastName: componentHtml.querySelector('input#last-name') as HTMLInputElement,
      employeeId: componentHtml.querySelector('input#employee-id') as HTMLInputElement,
      addBtn: fixture.debugElement.query(By.css('#add-edit-user-btn')).nativeElement,
      resetBtn: fixture.debugElement.query(By.css('#reset-btn')).nativeElement,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test reset', () => {
    form.firstName.value = 'user12132123123';
    form.lastName.value = 'last2331231';
    form.employeeId.value = '1323123123213';

    form.firstName.dispatchEvent(newEvent('input'));
    form.lastName.dispatchEvent(newEvent('input'));
    form.employeeId.dispatchEvent(newEvent('input'));

    form.resetBtn.click();
  });


  it('test input', () => {
    form.firstName.value = 'My First Name';
    form.lastName.value = 'My Last Name';
    form.employeeId.value = '937384';

    form.firstName.dispatchEvent(newEvent('input'));
    form.lastName.dispatchEvent(newEvent('input'));
    form.employeeId.dispatchEvent(newEvent('input'));

    form.addBtn.click();
  });

  it('sort functionality', () => {
    const sortfirstBtn = fixture.debugElement.query(By.css('#sort-fn')).nativeElement;
    const sortLastBtn = fixture.debugElement.query(By.css('#sort-fn')).nativeElement;
    const sortIdBtn = fixture.debugElement.query(By.css('#sort-fn')).nativeElement;
    sortfirstBtn.click();
    sortLastBtn.click();
    sortIdBtn.click();
  });

  // it('edit functionality', () => {
  //   const editBtn = fixture.debugElement.queryAll(By.css('.user-btn'));
  //   console.log(editBtn);
    // if (editBtn.length > 0) {
    //   editBtn[0].nativeElement.click();
    //   expect(form.firstName.value.length).toBeGreaterThan(0);
    //   expect(form.lastName.value.length).toBeGreaterThan(0);
    //   expect(form.employeeId.value.length).toBeGreaterThan(0);

    //   const editSubmitBtn = form.addBtn;
    //   editSubmitBtn.click();
    // }
  // });

});
