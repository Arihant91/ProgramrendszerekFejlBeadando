import { Component, OnInit } from '@angular/core';
import { LoginService } from '../utils/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private loginservice : LoginService) { 
  }

  ngOnInit(): void {
  }

  register(){
    this.loginservice.register(this.username, this.email, this.password).subscribe(msg => {
      console.log(msg);
    }, error => {
      console.log(error);
    })
    /*if(this.username != '' && this.email != '' && this.password != ''){
      return this.loginservice.register(this.username, this.email, this.password);
    }*/
  }

}
