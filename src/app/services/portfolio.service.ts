import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiServiceUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPortfolio(): Observable<any>{
    return this.http.get<any>(`${this.apiServiceUrl}/portfolio/1`);
  }

  public updatePortfolio(id:number, portfolio:Portfolio):Observable<Portfolio>{
    return this.http.put<Portfolio>(`${this.apiServiceUrl}/portfolio/${id}`, portfolio);
  }

}