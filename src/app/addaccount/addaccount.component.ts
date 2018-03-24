import { Component, OnInit } from '@angular/core';
import { PostpageService } from '../postpage.service';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.component.html',
  styleUrls: ['./addaccount.component.css']
})
export class AddaccountComponent implements OnInit {
  textareahuy;
  constructor(private _postpageservice: PostpageService) { }
  arrTokens = []
  arrInfor: Array<string>
  ngOnInit() {
  }
  onFormSubmit(formvalue) {
    let html = formvalue.value.code
    let htmltext = this._postpageservice.html2text(html)
    let token = this._postpageservice.getToken(htmltext)
    this.arrTokens.push(token)
    this.arrInfor = this._postpageservice.getInforUser(this.arrTokens)
  }
}
