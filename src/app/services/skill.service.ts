import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiServiceUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getSkill(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.apiServiceUrl}/skills`);
  }
  public addSkill(skills: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiServiceUrl}/skills`, skills);
  }

  public updateSkill(skills: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiServiceUrl}/skills`, skills);
  }
  public deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/skills/${id}`);
  }
}
