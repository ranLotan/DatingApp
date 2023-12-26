import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public registerMode = false;
  public users: any = null;

  constructor(){}

  public registerModeToggle(): void {
    this.registerMode = !this.registerMode;
  }

  public changeRegisterMode(isRegisterMode: boolean): void {
    this.registerMode = isRegisterMode;
  }
}
