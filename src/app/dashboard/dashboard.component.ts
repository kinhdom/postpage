import { Component, OnInit } from '@angular/core';
import { DashboardserviceService } from '../dashboardservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  arrResult = [];
  constructor(private _dashboardservice: DashboardserviceService) { }

  ngOnInit() {
    this._dashboardservice.getResult().subscribe(results => {
      results.forEach(account => {
        Object.keys(account).map(key=>{
          this.arrResult.push(account[key].post)
        })
      });
    })
  }

}
