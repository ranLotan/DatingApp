import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReport } from '../_interfaces/report';
import { environment } from 'src/environments/environment';
import { MembersService } from './members.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private url: string = environment.apiUrl;
  constructor(private http: HttpClient, private memberService: MembersService) { }

  public addReport(report: IReport) :Observable<boolean>{
    const userjson = localStorage.getItem('user');
    if (!userjson){ return of(false);}
    const user = JSON.parse(userjson);
    return this.http.post<boolean>(this.url + `reports/addreport/${user.userName}`,report);
  }
}
