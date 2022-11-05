import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public portfolio: Portfolio | undefined;
  public editPortfolio: Portfolio | undefined;

  constructor(
    private portfolioService : PortfolioService) 
    { }

  ngOnInit() {
    this.getPortfolio();
  }

  public getPortfolio():void{
    this.portfolioService.getPortfolio().subscribe({
      next:(response: Portfolio) =>{
        this.portfolio = response;
      },
      error: (error:HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

  public onOpenModal(mode:string, portfolio?: Portfolio): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    button.setAttribute('data-bs-target', '#editPortfolioModal');

    container?.appendChild(button);
    button.click();
  }

  public onUpdatePortfolio(portfolio:Portfolio):void{
    this.editPortfolio = portfolio;
    this.portfolioService.updatePortfolio(1, portfolio).subscribe({
      next: (response: Portfolio) => {
        console.log(response);
        this.getPortfolio();
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }

}
