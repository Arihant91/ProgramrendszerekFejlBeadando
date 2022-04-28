import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
    
  }

  login(username: string, password: string){
    return this.http.post(environment.serverUrl + '/login', {username: username, password: password}, {withCredentials: true, responseType: 'text'});
  }

  logout(){
    return this.http.post(environment.serverUrl + '/logout', {withCredentials: true, responseType: 'text'});
  }

  register(username: string, email: string, password: string){
    return this.http.post(environment.serverUrl + '/user', {username: username, password: password, email: email}, {withCredentials: true, responseType: 'text'});
  }
}
