import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectService', () => {
  let project;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProjectService],
    imports: [
      HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });

  it('get list of projects', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.getProjects().subscribe(value => {
      expect(value.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });

  it('create a project', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    const projObj = {
      project: 'New Project',
      startDate: new Date(),
      endDate: +new Date() + 24 * 60 * 60 * 1000,
      priority: 28,
      manager: null,
    };
    service.addProject(projObj).subscribe(value => {
      project = value;
      expect(value.project).toEqual('New Project');
      done();
    });
  });

  it('get a project', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.getProjectById(project._id).subscribe(value => {
      expect(value).toEqual(project);
      done();
    });
  });

  it('edit a project', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    const projObj = {
      project: 'New Modified Project',
      startDate: new Date(),
      endDate: +new Date() + 24 * 60 * 60 * 1000,
      priority: 22,
      manager: null,
    };
    service.editProject(project._id, projObj).subscribe(value => {
      expect(value._id).toEqual(project._id);
      project = value;
      done();
    });
  });

  it('add a parent task', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    const parentTaskObj = {
      parentTask: 'Parent Task 1',
    };
    service.addParentTask(project._id, parentTaskObj).subscribe(value => {
      service.getProjectById(project._id).subscribe(proj => {
        expect(proj.parentTasks[0].parentTask).toEqual(parentTaskObj.parentTask);
        project = proj;
        done();
      });
    });
  });

  it('edit a parent task', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    const parentTaskObj = {
      parentTask: 'Modified Parent Task 1',
    };
    service.editParentTask(project._id, project.parentTasks[0]._id, parentTaskObj).subscribe(value => {
      service.getProjectById(project._id).subscribe(proj => {
        expect(proj.parentTasks[0].parentTask).toEqual(parentTaskObj.parentTask);
        project = proj;
        done();
      });
    });
  });

  it('add child task to parent task', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    const childTaskObj = {
      task: 'task 1',
      priority: 26,
      startDate: new Date(),
      endDate: +new Date() + 24 * 60 * 60 * 1000,
      user: null,
    };
    service.addChildToParentTask(project._id, project.parentTasks[0]._id, childTaskObj).subscribe(value => {
      service.getProjectById(project._id).subscribe(proj => {
        expect(proj.parentTasks[0].childTasks[0].task).toEqual(childTaskObj.task);
        project = proj;
        done();
      });
    });
  });

  it('edit child task to parent task', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    const childTaskObj = {
      task: 'Modifiedtask 1',
      priority: 24,
      startDate: new Date(),
      endDate: +new Date() + 7 * 24 * 60 * 60 * 1000,
      user: null,
    };
    service.editChildOfParentTask(
      project._id,
      project.parentTasks[0]._id,
      project.parentTasks[0].childTasks[0]._id,
      childTaskObj).subscribe(value => {
        service.getProjectById(project._id).subscribe(proj => {
          expect(proj.parentTasks[0].childTasks[0].task).toEqual(childTaskObj.task);
          project = proj;
          done();
        });
      });
  });

  it('complete child task of parent task', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.complteChildOfParentTask(
      project._id,
      project.parentTasks[0]._id,
      project.parentTasks[0].childTasks[0]._id).subscribe(value => {
        service.getProjectById(project._id).subscribe(proj => {
          expect(proj.parentTasks[0].childTasks[0].status).toEqual('Complete');
          project = proj;
          done();
        });
      });
  });

  it('delete a child task of parent task', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.deleteChildOfParentTask(project._id, project.parentTasks[0]._id, project.parentTasks[0].childTasks[0]._id).subscribe(value => {
      expect(value.parentTasks[0].childTasks.length).toEqual(0);
      done();
    });
  });

  it('delete a parent task', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.deleteParentTask(project._id, project.parentTasks[0]._id).subscribe(value => {
      expect(value.parentTasks.length).toEqual(0);
      done();
    });
  });

  it('delete a project', (done: DoneFn) => {
    const service: ProjectService = TestBed.get(ProjectService);
    service.deleteProject(project._id).subscribe(value => {
      expect(value._id).toEqual(project._id);
      project = null;
      done();
    });
  });

});
