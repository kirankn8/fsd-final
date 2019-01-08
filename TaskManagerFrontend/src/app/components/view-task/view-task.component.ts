import { Component, OnInit } from '@angular/core';
import { SelectDialogBoxComponent } from '../select-dialog-box/select-dialog-box.component';
import { MatDialog } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  projectList: any;
  selectedProject: any;
  sortBy: string;

  constructor(public dialog: MatDialog, private projectService: ProjectService, public router: Router) { }

  ngOnInit() {
    this.getProjectList();
    localStorage.clear();
  }

  onClickSort(key) {
    if (key === this.sortBy) {
      this.sortBy = null;
    } else {
      this.sortBy = key;
    }
  }

  getProjectList() {
    this.projectService.getProjects().subscribe(projs => {
      this.projectList = projs;
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
      }
    });
  }

  taskEdit(parentTask, childTask?) {
    const projectDetails = {
      projectId: this.selectedProject._id,
      projectName: this.selectedProject.project,
      parentTask: parentTask,
      childTask: childTask,
    };
    localStorage.setItem('taskToEdit', JSON.stringify(projectDetails));
    this.router.navigate(['/edit-task']);
  }

  markParentComplete(parentTask) {
    for (const childTask of parentTask.childTasks) {
      this.markChildComplete(parentTask._id, childTask._id);
    }
  }

  markChildComplete(parentTaskId, childTaskId) {
    this.projectService.complteChildOfParentTask(
      this.selectedProject._id,
      parentTaskId,
      childTaskId
    ).subscribe((res) => { this.selectedProject = res; });
  }

  checkIfComplete(parentTask) {
    for (const childTask of parentTask.childTasks) {
      if (childTask.status !== 'Complete') {
        return false;
      }
    }
    return true;
  }
}
