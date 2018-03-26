import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



const localToken = localStorage.getItem('token');

@Injectable()
export class PostpageService {
  page_name;
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
      if (i > accs.length - 1) {
        var j = i % accs.length
      } else {
        var j = i
      }
      let query = 'https://graph.facebook.com/v2.11/' + pages[i] + '/photos'
      let data = {
        option:{
          access_token: accs[j].access_token,
          caption: content,
          url: image
        },
        acc:{
          id:accs[j].info.id,
          name:accs[j].info.name
        }
      }
      let infoPage = this.getInfoPage(pages[i], data.option.access_token).subscribe(infopage => {
        var post = {
          post_id: '',
          post_message: content,
          post_image: image,
          post_onpage_id: infopage.id,
          post_onpage_name: infopage.name,
          from_id: data.acc.id,
          from_name: data.acc.name,
        }
        this._http.post(query, data.option).map(res => res.json()).subscribe(res => {
          post.post_id = res.post_id
          this._db.list('postpage/dashboard/' + localToken + '/' + post.from_id).push({ post: post })
          console.log(res)
        })
      })

    }

  }
  getInfoPage(uid, access_token) {
    let query = 'https://graph.facebook.com/' + uid + '?access_token=' + access_token
    return this._http.get(query).map(res => res.json())
  }
}
