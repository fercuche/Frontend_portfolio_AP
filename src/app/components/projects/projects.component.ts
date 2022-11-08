import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public projects:Project[]=[];
  public editProject: Project | undefined;
  public deleteProject: Project | undefined;

  constructor(
    private projectService: ProjectService,
    private authService : AuthenticationService) { }
    islogged = () => this.authService.loggedIn();

  ngOnInit(): void {
    this.getProject();
  }

  public getProject(): void{
    this.projectService.getProject().subscribe({
      next:(response: Project[]) =>{
        this.projects = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      }
    })
  }
  
  public onOpenModal(mode: string, project?: Project): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addProjectModal');
    } else if (mode === 'edit') {
      this.editProject = project;
      button.setAttribute('data-bs-target', '#editProjectModal');
    } else if (mode === 'delete') {
      this.deleteProject = project;
      button.setAttribute('data-bs-target', '#deleteProjectModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddProject(addForm: NgForm): void {
    document.getElementById('add-project-form')?.click();
    this.projectService.addProject(addForm.value).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProject();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateProject(project: Project): void {
    this.editProject = project;
    this.projectService.updateProject(project).subscribe({
      next: (response: Project) => {
        console.log(response);
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onDeleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProject();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

}
