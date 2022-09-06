import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUser():Observable<Portfolio>{
    return this.http.get<Portfolio>(`${this.apiServiceUrl}/portfolio/id/1`)
  }

}
