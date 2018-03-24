import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostpageService {

  constructor(private _http: Http) { }
  // Add account
  getToken(htmltext) {
    let x = htmltext.indexOf('EAAAA')
    let token1 = htmltext.substr(x, 200)
    let y = token1.indexOf("\"")
    return token1.substr(0, y)
  }
  getInforUser(arrTokens) {
    let arrInfor = []
    arrTokens.forEach(token => {
      let query = 'https://graph.facebook.com/me?access_token=' + token
      this._http.get(query).subscribe(res => {
        arrInfor.push(res.json())
      })
    });
    return arrInfor
  }
  html2text(html) {
    var tag = document.createElement('div');
    tag.innerHTML = html;
    return tag.innerText;
  }
  // Scan id
  // Post content

}
