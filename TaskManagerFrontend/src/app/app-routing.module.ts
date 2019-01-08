import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';

const routes: Routes = [
  { path: 'add-project', component: AddProjectComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'view-task', component: ViewTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
