import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, from } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User as User } from '../_interfaces/user-name';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../_services/modal.service';

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
    private router: Router,
    private toaster: ToastrService,
    private modalService: ModalService
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
      next: _ => this.router.navigateByUrl('/reports'),
      error: (result: User) => this.toaster.error(result.error)
    });
  }

  public logOut(): void{
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }
  public openAddReportModal(): void {
    this.modalService.openAddReport();
  }
}
