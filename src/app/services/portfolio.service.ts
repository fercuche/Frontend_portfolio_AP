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

  public getPortfolio(): Observable<Portfolio>{
    return this.http.get<Portfolio>(`${this.apiServiceUrl}/portfolio/1`);
  }

  public updatePortfolio(portfolio:Portfolio):Observable<Portfolio>{
    return this.http.put<Portfolio>(`${this.apiServiceUrl}/portfolio`, portfolio);
  }

}