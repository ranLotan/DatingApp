import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, from } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User as User } from '../_interfaces/user-name';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit, OnDestroy {

  public model : any = {};
  public isLoggedIn: boolean = false;
  public userName: string = '';
  private userSubscription: Subscription | null = null;
  
  constructor( 
      public accountService : AccountService, 
    ){}
    
    ngOnInit(): void {
      this.userSubscription = this.accountService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if(user){
        this.userName = user.userName;
      }
      else {
        this.userName = '';
      }
    })
  }

  ngOnDestroy(): void {
    if(this.userSubscription)
    this.userSubscription.unsubscribe();
  
  }

  public login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: (result: User) => console.log(result),
      error: (result: User) => console.log(result)
    });
  }

  public logOut(): void{
    this.accountService.logOut();
  }
}
