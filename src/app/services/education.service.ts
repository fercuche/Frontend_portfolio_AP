import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getEducation(): Observable<Education[]>{
    return this.http.get<Education[]>(`${this.apiServiceUrl}/education`);
  }
  
  public addEducation(education:Education): Observable<Education>{
    return this.http.post<Education>(`${this.apiServiceUrl}/education`,education)
  }

  public updateEducation(education: Education): Observable<Education>{
    return this.http.patch<Education>(`${this.apiServiceUrl}/education`,education)
  }

  public deleteEducation(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/education/${id}`)
  }
}
