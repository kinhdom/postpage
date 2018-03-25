import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

const localToken = localStorage.getItem('token');

@Injectable()
export class PostpageService {
  usersRef: AngularFireList<any>;

  constructor(private _http: Http, private _db: AngularFireDatabase) {
    this.usersRef = this._db.list('postpage/users');
  }

  // Authenticate
  addUser(key, password) {
    this._db.list('postpage/users').push({ password: password })
  }
  getUser() {
    return this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  register(key, password) {
    this._db.list('postpage/users').update(key, { password: password })
  }
  // Add account
  addAcount(htmltext) {
    let x = htmltext.indexOf('EAAAA')
    let token1 = htmltext.substr(x, 200)
    let y = token1.indexOf("\"")
    let token = token1.substr(0, y)
    this.getInfo(token).subscribe(info => {
      // this._db.list('postpage/users/' + localToken + '/accounts').push({ info: info, access_token: token })
      this._db.list('postpage/users/' + localToken + '/accounts').update(info.id, { info: info, access_token: token })
    })
  }

  getInfo(token) {
    let query = 'https://graph.facebook.com/me?access_token=' + token
    return this._http.get(query).map(res => res.json())
  }
  getListAcount() {
    return this._db.list('postpage/users/' + localToken + '/accounts').valueChanges()
  }
  html2text(html) {
    var tag = document.createElement('div');
    tag.innerHTML = html;
    return tag.innerText;
  }
  // Scan id
  // Post content
  postConent(content, image, pages, accs) {
    for (var i = 0; i < pages.length; i++) {
      if (i > accs.length) {
        var j = i % accs.length
      } else {
        var j = i
      }
      let query = 'https://graph.facebook.com/v2.11/' + pages[i] + '/photos'
      this._http.post(query, { access_token: accs[j].access_token, caption: content, url: image }).map(res => res.json()).subscribe(res => console.log(res))
    }

  }

}
