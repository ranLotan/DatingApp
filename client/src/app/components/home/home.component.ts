import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  public registerMode = false;
  public users: any = null;

  constructor(private http: HttpClient){}
  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() : void{
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: result => this.users = result,
      error: error => console.log(error),
      complete: () => console.log("Get Users Request completed")
    });
 }

  public registerModeToggle(): void {
    this.registerMode = !this.registerMode;
  }

  public changeRegisterMode(isRegisterMode: boolean): void {
    this.registerMode = isRegisterMode;
  }
}
