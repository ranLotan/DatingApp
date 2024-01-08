import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './components/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayersTabComponent } from './components/layers-tab/layers-tab.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AddReportComponent } from './components/reports/add-report/add-report.component';
import { ReportsListComponent } from './components/reports/reports-list/reports-list.component';
import { LayersListComponent } from './components/Layers/layers-list/layers-list.component';
import { AddLayersComponent } from './components/Layers/add-layers/add-layers.component';
import { SharedModule } from './_modules/shared.module';
import { MembersListComponent } from './components/members-list/members-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    NavComponent,
    LayersTabComponent,
    HomeComponent,
    RegisterComponent,
    AddReportComponent,
    ReportsListComponent,
    LayersListComponent,
    AddLayersComponent,
    MembersListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
