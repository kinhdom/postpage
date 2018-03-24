import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostpageService } from '../postpage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private _postpageservice: PostpageService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/'])
    }
  }
  formSubmit(form) {
    let key = form.value.key
    let password = form.value.password;
    let token = key
    this._postpageservice.getUser().subscribe((arrUser) => {
      arrUser.forEach(user => {
        if (!user.password && user.key == key) {
          // Dang ky
          this._postpageservice.register(key, password)
          localStorage.setItem('token', token)
          this.router.navigate(['/'])
        } else {
          // Dang nhap
          if (user.key == key && user.password == password) {
            localStorage.setItem('token', token)
            this.router.navigate(['/'])
          }
        }
      });
    })
  }
}
