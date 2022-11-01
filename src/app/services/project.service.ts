import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProject(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiServiceUrl}/projects`)
  }

  public addProject(project:Project): Observable<Project>{
    return this.http.post<Project>(`${this.apiServiceUrl}/projects`,project)
  }

  public updateProject(project: Project): Observable<Project>{
    return this.http.patch<Project>(`${this.apiServiceUrl}/projects`,project)
  }

  public deleteProject(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/projects/${id}`)
  }
}
