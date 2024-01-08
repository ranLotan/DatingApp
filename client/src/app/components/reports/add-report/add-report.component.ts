import { DatePipe } from '@angular/common';
import { Component, inject, Input, TemplateRef } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/_services/reports.service';

@Component({
	selector: 'app-add-report',
	templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent {
  constructor(private reportService: ReportsService, private toaster: ToastrService){}
  activeModal = inject(NgbActiveModal);
  
  public report :any = {};

  public submitReport() {
    if (!this.validateReport()){
      return;
    };

    const reportDate =  this.report.reportDate;
    this.report.reportDate = this.formatDate(new Date(reportDate.year,reportDate.month, reportDate.day));

    this.reportService.addReport(this.report).subscribe({
      next: (result: boolean) => result?  this.toaster.info("report added successfully"): 
                                       this.toaster.info("user is not valid, report not saved."),
      error: error => {
        console.error(error);
        this.toaster.error("internal server error, please try later");
      },  
    });
    console.log(this.report);
    this.activeModal.close();


  }

  private validateReport(){
    if (this.report.title == undefined || this.report.title == ""){
      this.toaster.error("must includ title");
      return false;
    }

    if (!this.validateLatLong(this.report.lat) || !this.validateLatLong(this.report.long)){
      this.toaster.error("Latitue and Longtitude is not between -180 - 180");
      return false;
    }

    if (this.report.reportDate == null){
      this.toaster.error("must include date");
      return false;
    }
    return true;
  }

  private validateLatLong(num: number){
    return (num < 180 && num > -180);
  }

  private formatDate(date: Date): string | null {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-dd');
  }
}