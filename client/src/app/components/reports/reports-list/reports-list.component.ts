import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_interfaces/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css']
})
export class ReportsListComponent implements OnInit {
  public members: Member[] = [];

  constructor(private memberService: MembersService){}
  ngOnInit(): void {
    this.loadMembers();
  }

  public loadMembers(){
    this.memberService.getMembers().subscribe({
      next: members => this.members = members
    });
  }
}
