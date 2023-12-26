import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_interfaces/member';
import { IReport } from 'src/app/_interfaces/report';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {
  private members: Member[] = [];
  public reports: IReport[] = [];

  constructor(private memberService: MembersService){}
   ngOnInit(): void {
    this.loadMembers();
  }
  
  private async loadMembers(){
    await this.memberService.getMembers().subscribe({
      next: 
        members => {
          this.members = members;
          this.initLocations();
        }
    });
  }
  
  private initLocations() {
    if (!this.members.length){ return; }

    this.reports = this.members.filter(member => member.reports.length)
                                 .flatMap<IReport>(member => member.reports);
  }
}
