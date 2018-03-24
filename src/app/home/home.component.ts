import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin: boolean = false
  constructor() { }
  ngOnInit() {
    let token = localStorage.getItem('token')
    if(token){
      this.isLogin = true
    }
  }
}
