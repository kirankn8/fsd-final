import { Component, OnInit } from '@angular/core';
import { SelectDialogBoxComponent } from '../select-dialog-box/select-dialog-box.component';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  userList: any;
  projectList: any;
  selectedProject: any;
  selectedParentTask: any;
  selectedUser: any;
  sortBy: string;
  searchValue: string;

  taskForm = this.fb.group(
    {
      project: ['', Validators.required],
      task: ['', Validators.required],
      isParentTask: [false],
      priority: [0, Validators.required],
      parentTask: '',
      startDate: [null],
      endDate: [null],
      user: [''],
    }
  );

  constructor(public dialog: MatDialog, private userService: UserService,
    private fb: FormBuilder, private projectService: ProjectService) { }

  ngOnInit() {
    this.getProjectList();
    this.getUserList();
    this.enableFields();
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
      if (this.taskForm.value.isParentTask) {
        this.addTaskAsParent();
      } else {
        this.addTaskAsChild();
      }
    }
  }

  addTaskAsParent() {
    const projectId = this.selectedProject._id;
    const parentTaskObj = {
      parentTask: this.taskForm.value.task,
    };
    this.projectService.addParentTask(projectId, parentTaskObj)
      .subscribe(res => {
        alert('Successfully added task');
        this.getProjectList();
        this.resetTaskForm();
      });
  }

  addTaskAsChild() {
    const projectId = this.selectedProject._id;
    const parentTaskId = this.selectedParentTask._id;
    const childTaskObj = {
      task: this.taskForm.value.task,
      priority: this.taskForm.value.priority,
      startDate: this.taskForm.value.startDate,
      endDate: this.taskForm.value.endDate,
      user: this.selectedUser ? this.selectedUser._id : null,
    };
    this.projectService.addChildToParentTask(projectId, parentTaskId, childTaskObj)
      .subscribe(res => {
        alert('Successfully added task');
        this.getProjectList();
        this.resetTaskForm();
      });
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
        data: { title: 'Select Task', genericList: this.selectedProject.parentTasks, prop: 'parentTask' }
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
      } else {
        this.selectedUser = null;
        this.taskForm.patchValue({
          user: null,
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
  }
}
