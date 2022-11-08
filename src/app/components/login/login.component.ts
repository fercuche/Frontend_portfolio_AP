import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  constructor(private formBuilder:FormBuilder, private authenticationService:AuthenticationService, private router:Router) {
    this.form=this.formBuilder.group(
      {
        username:['',[Validators.required,Validators.email]],
        password:['',[Validators.required, Validators.minLength(8)]],
        deviceInfo:this.formBuilder.group({
          deviceId: ["17867868768"],
          deviceType: ["DEVICE_TYPE_ANDROID"],
          notificationToken:["67657575eececc34"]
        })
      }
    )
   }

  ngOnInit(): void {
  }

  get Username()
  {
    return this.form.get('username');
  }
  
  get Password()
  {
    return this.form.get('password');
  }

  onEnviar(event:Event)
  {
    event.preventDefault;
    this.authenticationService.SignIn(this.form.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      this.router.navigate(['/header']);

    })
  }

}