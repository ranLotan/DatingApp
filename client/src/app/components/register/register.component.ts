import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_interfaces/user-name';
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

  constructor(private accountService: AccountService,
     private toaster: ToastrService){
    
  }

  public register() {
    if (!this.validateRegistration()){
      return;
    }
    this.accountService.register(this.model).subscribe({
      next: _ => this.cancel(),
      error: (result: User) => this.toaster.error(result.error),      
    });
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
      this.toaster.error("user name is empty");
      return false;
    }
    if (this.users?.find(user => user == this.model.username)){
      this.toaster.error("user name is occupied");
      return false;
    }
    return true;
  }

}
