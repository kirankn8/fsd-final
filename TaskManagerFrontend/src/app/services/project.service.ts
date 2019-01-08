import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<any>('/api/projects');
  }

  getProjectById(Id) {
    return this.http.get<any>('/api/project/' + Id);
  }

  addProject(projectObj) {
    return this.http.post<any>('/api/project', projectObj, httpOptions);
  }

  editProject(id, projectObj) {
    return this.http.put<any>('/api/project/' + id, projectObj, httpOptions);
  }

  deleteProject(id) {
    return this.http.delete<any>('/api/project/' + id);
  }

  addParentTask(id, parentTaskObj) {
    return this.http.post<any>(`/api/project/${id}/task`, parentTaskObj, httpOptions);
  }

  editParentTask(id, parentTaskId, parentTaskObj) {
    return this.http.put<any>(`/api/project/${id}/task/${parentTaskId}`, parentTaskObj, httpOptions);
  }

  deleteParentTask(id, parentTaskId) {
    return this.http.delete<any>(`/api/project/${id}/task/${parentTaskId}`);
  }

  addChildToParentTask(id, parentTaskId, childTaskObj) {
    return this.http.post<any>(`/api/project/${id}/task/${parentTaskId}`, childTaskObj, httpOptions);
  }

  editChildOfParentTask(id, parentTaskId, childTaskId, childTaskObj) {
    return this.http.put<any>(`/api/project/${id}/task/${parentTaskId}/child/${childTaskId}`, childTaskObj, httpOptions);
  }

  deleteChildOfParentTask(id, parentTaskId, childTaskId) {
    return this.http.delete<any>(`/api/project/${id}/task/${parentTaskId}/child/${childTaskId}`);
  }

  complteChildOfParentTask(id, parentTaskId, childTaskId) {
    return this.http.put<any>(`/api/project/${id}/task/${parentTaskId}/child/${childTaskId}/completed`, {}, httpOptions);
  }
}
