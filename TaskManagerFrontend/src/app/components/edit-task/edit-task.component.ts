import { Component, OnInit } from '@angular/core';
import { SelectDialogBoxComponent } from '../select-dialog-box/select-dialog-box.component';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  userList: any;
  projectList: any;
  selectedProject: any;
  selectedParentTask: any;
  selectedUser: any;
  sortBy: string;
  searchValue: string;
  taskToEdit: any;
  wasChild: boolean;

  taskForm = this.fb.group(
    {
      project: this.taskToEdit,
      task: this.taskToEdit,
      isParentTask: [false],
      priority: [0, Validators.required],
      parentTask: '',
      startDate: this.taskToEdit,
      endDate: this.taskToEdit,
      user: '',
    }
  );

  constructor(public dialog: MatDialog, private userService: UserService,
    private fb: FormBuilder, private projectService: ProjectService, public router: Router, public datepipe: DatePipe) { }

  ngOnInit() {
    this.getProjectList();
    this.getUserList();
    setTimeout(() => {
      this.taskToEdit = JSON.parse(localStorage.getItem('taskToEdit'));
      if (this.taskToEdit) {
        this.wasChild = this.taskToEdit.hasOwnProperty('childTask');
        this.populateEditForm();
      } else {
        this.navigateBacktoViewTask();
      }
    }, 500);
  }

  populateEditForm() {
    this.getProjectById(this.taskToEdit.projectId);
    if (this.wasChild) {
      this.enableFields();
      this.taskForm.setValue({
        project: this.taskToEdit.projectName,
        task: this.taskToEdit.childTask.task,
        isParentTask: false,
        priority: this.taskToEdit.childTask.priority,
        parentTask: this.taskToEdit.parentTask.parentTask,
        startDate: this.datepipe.transform(this.taskToEdit.childTask.startDate, 'yyyy-MM-dd'),
        endDate: this.datepipe.transform(this.taskToEdit.childTask.endDate, 'yyyy-MM-dd'),
        user: this.taskToEdit.childTask.user ? this.taskToEdit.childTask.user.firstName : null,
      });
    } else {
      this.taskForm.patchValue({
        project: this.taskToEdit.projectName,
        task: this.taskToEdit.parentTask.parentTask,
        isParentTask: true,
      });
      this.disableFields();
    }
  }

  disableFields() {
    this.taskForm.controls['priority'].disable();
    this.taskForm.controls['parentTask'].disable();
    this.taskForm.controls['startDate'].disable();
    this.taskForm.controls['endDate'].disable();
    this.taskForm.controls['user'].disable();
  }

  enableFields() {
    this.taskForm.controls['priority'].enable();
    this.taskForm.controls['parentTask'].enable();
    this.taskForm.controls['startDate'].enable();
    this.taskForm.controls['endDate'].enable();
    this.taskForm.controls['user'].enable();
  }

  getProjectById(Id) {
    this.projectService.getProjectById(Id).subscribe(proj => {
      this.selectedProject = proj;
    });
  }

  getProjectList() {
    this.projectService.getProjects().subscribe(projs => {
      this.projectList = projs;
    });
  }

  getUserList() {
    this.userService.getUsers().subscribe(users => {
      this.userList = users;
    });
  }

  onSubmit() {
    const isPT = this.taskForm.value.isParentTask;
    const sD = this.taskForm.value.startDate;
    const eD = this.taskForm.value.endDate;
    const userField = this.taskForm.value.user;
    const _sD = new Date(sD);
    const _eD = new Date(eD);
    if (this.taskForm.status === 'INVALID') {
      alert('Please fill all the fields');
    } else if (isPT === false && sD === null && eD === null) {
      alert('Please set Start Date and End Date');
    } else if (isPT === false && _sD > _eD) {
      alert('Start Date should be before End Date');
    } else if (isPT === false && userField === '') {
      alert('Please fill all the fields');
    } else {
      if (this.taskForm.value.isParentTask && !this.wasChild) {
        // just edit parent
        const parentTaskObj = {
          parentTask: this.taskForm.value.task,
        };

        this.projectService.editParentTask(
          this.taskToEdit.projectId,
          this.taskToEdit.parentTask._id,
          parentTaskObj
        ).subscribe(() => { alert('Successfully updated task'); this.navigateBacktoViewTask(); });

      } else if (this.taskForm.value.isParentTask && this.wasChild) {
        // delete child and add parent
        this.projectService.deleteChildOfParentTask(
          this.taskToEdit.projectId,
          this.taskToEdit.parentTask._id,
          this.taskToEdit.childTask._id).subscribe(() => {
            this.addTaskAsParent();
          });

      } else if (!this.taskForm.value.isParentTask && this.wasChild) {
        // just edit child
        const childTaskObj = {
          task: this.taskForm.value.task,
          priority: this.taskForm.value.priority,
          startDate: this.taskForm.value.startDate,
          endDate: this.taskForm.value.endDate,
          user: this.selectedUser ? this.selectedUser._id : this.taskToEdit.childTask.user ? this.taskToEdit.childTask.user._id : null,
        };
        if (!this.selectedParentTask || this.taskToEdit.parentTask._id === this.selectedParentTask._id) {
          this.projectService.editChildOfParentTask(
            this.taskToEdit.projectId,
            this.taskToEdit.parentTask._id,
            this.taskToEdit.childTask._id,
            childTaskObj
          ).subscribe(() => { alert('Successfully updated task'); this.navigateBacktoViewTask(); });
        } else {
          this.projectService.deleteChildOfParentTask(
            this.taskToEdit.projectId,
            this.taskToEdit.parentTask._id,
            this.taskToEdit.childTask._id).subscribe(() => {
              this.addTaskAsChild();
            });
        }

      } else if (!this.taskForm.value.isParentTask && !this.wasChild) {
        // delete parent and add child to new parent
        this.projectService.deleteParentTask(this.taskToEdit.projectId, this.taskToEdit.parentTask._id)
          .subscribe(() => {
            this.addTaskAsChild();
          });
      }
    }
  }

  addTaskAsParent() {
    const projectId = this.selectedProject._id;
    const parentTaskObj = {
      parentTask: this.taskForm.value.task,
    };
    this.projectService.addParentTask(projectId, parentTaskObj)
      .subscribe(res => { alert('Successfully updated task'); this.resetTaskForm(); });
  }

  addTaskAsChild() {
    const projectId = this.selectedProject._id;
    const parentTaskId = this.selectedParentTask._id;
    const childTaskObj = {
      task: this.taskForm.value.task,
      priority: this.taskForm.value.priority,
      startDate: this.taskForm.value.startDate,
      endDate: this.taskForm.value.endDate,
      user: this.selectedUser ? this.selectedUser._id : this.taskToEdit.childTask.user._id,
    };
    this.projectService.addChildToParentTask(projectId, parentTaskId, childTaskObj)
      .subscribe(res => { alert('Successfully updated task'); this.resetTaskForm(); });
  }

  openProjectDialog() {
    const dialogRef = this.dialog.open(SelectDialogBoxComponent, {
      width: '600px',
      height: '400px',
      data: { title: 'Select Project', genericList: this.projectList, prop: 'project' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedProject = result;
        this.taskForm.patchValue({
          project: result.project,
        });
      }
    });
  }

  openTaskDialog() {
    if (this.selectedProject) {
      const dialogRef = this.dialog.open(SelectDialogBoxComponent, {
        width: '600px',
        height: '400px',
        data: {
          title: 'Select Task', genericList: this.selectedProject.parentTasks, prop: 'parentTask',
          exceptionIdList: this.taskToEdit.parentTask._id
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectedParentTask = result;
          this.taskForm.patchValue({
            parentTask: result.parentTask,
          });
        }
      });
    } else {
      alert('Please select Project');
    }
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(SelectDialogBoxComponent, {
      width: '600px',
      height: '400px',
      data: { title: 'Select User', genericList: this.userList, prop: 'firstName' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedUser = result;
        this.taskForm.patchValue({
          user: result.firstName,
        });
      }
    });
  }

  onSelectionChange() {
    if (this.taskForm.value.isParentTask) {
      this.disableFields();
    } else {
      this.enableFields();
    }
  }

  resetTaskForm() {
    this.taskForm.setValue({
      project: '',
      task: '',
      isParentTask: false,
      priority: 0,
      parentTask: '',
      startDate: '',
      endDate: '',
      user: '',
    });
    this.enableFields();
    this.navigateBacktoViewTask();
  }

  navigateBacktoViewTask() {
    localStorage.clear();
    this.router.navigate(['/view-task']);
  }
}
