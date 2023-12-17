import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayersListComponent } from './components/Layers/layers-list/layers-list.component';
import { ReportsListComponent } from './components/reports/reports-list/reports-list.component';
import { AddReportComponent } from './components/reports/add-report/add-report.component';
import { AddLayersComponent } from './components/Layers/add-layers/add-layers.component';
import { authGuard } from './_gurds/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path: 'reports', component: ReportsListComponent},
      {path: 'addreport', component: AddReportComponent},
      {path: 'layers', component: LayersListComponent},
      {path: 'addlayer', component: AddLayersComponent},
    ]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
