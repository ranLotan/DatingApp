import { Injectable, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddReportComponent } from '../components/reports/add-report/add-report.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openAddReport() {
    this.open();
  }

  constructor() { }

  private modalService = inject(NgbModal);
	closeResult = '';

	open() {
		this.modalService.open(AddReportComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
