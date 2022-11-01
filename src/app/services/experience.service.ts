import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiServiceUrl}/experiences/all`);
  }
  public addExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(
      `${this.apiServiceUrl}/experiences`,
      experience
    );
  }
  public updateExperience(experience: Experience): Observable<Experience> {
    return this.http.patch<Experience>(
      `${this.apiServiceUrl}/experiences`,
      experience
    );
  }
  public deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/experiences/${id}`
    );
  }
}
