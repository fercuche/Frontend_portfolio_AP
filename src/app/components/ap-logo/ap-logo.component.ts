import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-ap-logo',
  templateUrl: './ap-logo.component.html',
  styleUrls: ['./ap-logo.component.css']
})
export class ApLogoComponent implements OnInit {
  form: FormGroup;
  name: string | undefined;
  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  isloged = () => this.authenticationService.loggedIn();
  ngOnInit(): void {}

  get Username() {
    return this.form.get('username');
  }
  get Password() {
    return this.form.get('password');
  }

  onSend(event: Event) {
    if (this.form.invalid) {
      alert('Bad login');
      return;
    }
    event.preventDefault;
    this.authenticationService
      .SignIn(this.form.value)
      .subscribe((data) => {
        this.router.navigate(['']);
      });
  }
  handleClear() {
    this.name = '';
  }
}

