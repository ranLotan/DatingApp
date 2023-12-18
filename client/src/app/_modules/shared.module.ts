import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    GoogleMapsModule
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    GoogleMapsModule
  ]
})
export class SharedModule { }
