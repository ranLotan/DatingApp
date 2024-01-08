import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_interfaces/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  
  public getMembers() {
    return this.http.get<Member[]>(this.url + 'users', this.getHTTPOptions());
  }

  public async getMember(userName: string){
    return await this.http.get<Member>(this.url + 'users/' + userName, this.getHTTPOptions());
  }

  public getHTTPOptions() { 
    const userString = localStorage.getItem('user');
    if (!userString) { return; }

    const user = JSON.parse(userString);
    console.log(user);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
    }; 
  }
}
