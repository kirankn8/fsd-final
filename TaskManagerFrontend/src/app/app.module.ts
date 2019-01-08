import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchPipe } from './pipes/search.pipe';
import { SelectDialogBoxComponent } from './components/select-dialog-box/select-dialog-box.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { DatePipe } from '@angular/common';
import { ExceptionPipe } from './pipes/exception.pipe';

@NgModule({
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
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
  ],
  entryComponents: [SelectDialogBoxComponent, AddProjectComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
