import { Component, OnInit } from '@angular/core';
import { SelectDialogBoxComponent } from '../select-dialog-box/select-dialog-box.component';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {

  userList: any;
  projectList: any;
  selectedManager: any;
  sortBy: string;
  searchValue: string;
  isEditMode = false;
  editObj: any;

  projectForm = this.fb.group(
    {
      project: ['', Validators.required],
      defaultDate: [false],
      startDate: [null],
      endDate: [null],
      priority: [0, Validators.required],
      manager: ['', Validators.required],
    }
  );

  constructor(public dialog: MatDialog, private userService: UserService,
    private fb: FormBuilder, private projectService: ProjectService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.userList = this.userService.getUsers().subscribe(users => this.userList = users);
    this.disableDateFields();
    this.getProjectList();
  }

  disableDateFields() {
    this.projectForm.controls['startDate'].disable();
    this.projectForm.controls['endDate'].disable();
  }

  enableDateFields() {
    this.projectForm.controls['startDate'].enable();
    this.projectForm.controls['endDate'].enable();
  }

  openManagerDialog() {
    const dialogRef = this.dialog.open(SelectDialogBoxComponent, {
      width: '600px',
      height: '400px',
      data: { title: 'Select Manager', genericList: this.userList, prop: 'firstName' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedManager = result;
        this.projectForm.patchValue({
          manager: result.firstName,
        });
      }
    });
  }

  onSubmit() {
    const isDD = this.projectForm.value.defaultDate;
    const sD = this.projectForm.value.startDate;
    const eD = this.projectForm.value.endDate;
    const _sD = new Date(sD);
    const _eD = new Date(eD);
    if (this.projectForm.status === 'INVALID') {
      alert('Please fill all the fields');
    } else if (isDD === true && sD === null && eD === null) {
      alert('Please set Start Date and End Date');
    } else if (isDD === true && _sD > _eD) {
      alert('Start Date should be before End Date');
    } else {
      this.isEditMode ? this.editProject() : this.addProject();
    }
  }

  onSelectionChange() {
    if (!this.projectForm.value.defaultDate) {
      this.disableDateFields();
    } else {
      this.enableDateFields();
    }
  }

  getProjectList() {
    this.projectService.getProjects().subscribe(projs => {
      this.projectList = projs;
      for (const project of this.projectList) {
        project['completed'] = this.checkIfComplete(project.parentTasks);
      }
    });
  }

  addProject() {
    const projObj = {
      project: this.projectForm.value.project,
      defaultDate: this.projectForm.value.defaultDate,
      startDate: this.projectForm.value.startDate ? this.projectForm.value.startDate : new Date(),
      endDate: this.projectForm.value.endDate ? this.projectForm.value.endDate : +new Date() + 24 * 60 * 60 * 1000,
      priority: this.projectForm.value.priority,
      manager: this.selectedManager._id,
    };
    this.projectService.addProject(projObj).subscribe(project => {
      alert('Project added successfully');
      this.getProjectList();
      this.resetProjectForm();
    });
  }

  editProject() {
    const projObj = {
      project: this.projectForm.value.project,
      defaultDate: this.projectForm.value.defaultDate,
      startDate: this.projectForm.value.startDate ? this.projectForm.value.startDate : new Date(),
      endDate: this.projectForm.value.endDate ? this.projectForm.value.endDate : +new Date() + 24 * 60 * 60 * 1000,
      priority: this.projectForm.value.priority,
      manager: this.selectedManager._id,
    };
    this.projectService.editProject(this.editObj._id, projObj).subscribe(project => {
      alert('Project updated successfully');
      this.getProjectList();
      this.resetProjectForm();
    });
  }

  resetProjectForm() {
    this.projectForm.setValue({
      project: '',
      defaultDate: false,
      startDate: '',
      endDate: '',
      priority: 0,
      manager: '',
    });
    this.selectedManager = null;
    this.isEditMode = false;
    this.editObj = null;
    this.disableDateFields();
  }

  onClickSort(key) {
    if (key === this.sortBy) {
      this.sortBy = null;
    } else {
      this.sortBy = key;
    }
  }

  deleteProjectFromList(id) {
    this.projectService.deleteProject(id).subscribe(proj => {
      this.getProjectList();
    });
  }

  enableProjectEdit(project) {
    this.projectForm.setValue({
      project: project.project,
      defaultDate: true,
      startDate: this.datepipe.transform(project.startDate, 'yyyy-MM-dd'),
      endDate: this.datepipe.transform(project.endDate, 'yyyy-MM-dd'),
      priority: project.priority,
      manager: project.manager.firstName,
    });
    this.isEditMode = true;
    this.editObj = project;
    this.enableDateFields();
    this.selectedManager = project.manager;
  }

  checkIfComplete(parentTasks) {
    let parentTasksCompleted = 0;
    let tasksCompleted = 0;
    for (const parentTask of parentTasks) {
      tasksCompleted = 0;
      for (const childTask of parentTask.childTasks) {
        if (childTask.status === 'Complete') {
          tasksCompleted += 1;
        }
      }
      if (tasksCompleted === parentTask.childTasks.length) {
        parentTasksCompleted += 1;
      }
    }
    return parentTasksCompleted;
  }
}
