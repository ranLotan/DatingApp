import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input() users: string[] = [];
  @Output() cancelRegistration = new EventEmitter<boolean>();

  public model: any = {};

  constructor(private accountService: AccountService){
    
  }

  public register() {
    if (!this.validateRegistration()){
      return;
    }
    this.accountService.register(this.model);
    console.log('registred');
  }

  public cancel(): void {
    console.log("Registered request Cancelled");
    this.model.username = '';
    this.model.password = '';
    this.cancelRegistration.emit(false);
  }

  private validateRegistration(): boolean{
    let valid = true;
    if (!this.model.username){
      console.log("user name is empty");
      return false;
    }
    if (this.users?.find(user => user == this.model.username)){
      console.log("user name is occupied");
      return false;
    }
    return true;
  }

}
