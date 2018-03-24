import { Component } from '@angular/core';
import { PostpageService } from '../app/postpage.service';
import { Router } from '@angular/router';

interface User {
  key: string;
  password: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _postpageservice: PostpageService, private router: Router) {
    let token = localStorage.getItem('token')
    if (!token) {
      this.router.navigate(['login'])
    }
  }
}
