import { Component, OnInit } from '@angular/core';
import { PostpageService } from '../postpage.service';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.component.html',
  styleUrls: ['./addaccount.component.css']
})
export class AddaccountComponent implements OnInit {
  code;
  textareahuy;
  constructor(private _postpageservice: PostpageService) { }
  arrTokens = []
  arrInfor =[]
  ngOnInit() {
    
    this._postpageservice.getListAcount().subscribe(accounts => {
      this.arrInfor = []
      accounts.forEach(account => {
        let huy = JSON.stringify(account)
        let van = JSON.parse(huy)
        this.arrInfor.push(van.info)
      });
    })
  }
  onFormSubmit(formvalue) {
    let html = formvalue.value.code
    let htmltext = this._postpageservice.html2text(html)
    this._postpageservice.addAcount(htmltext)
    // this.arrTokens.push(token)
    // this.arrInfor = this._postpageservice.getInforUser(this.arrTokens)
  }
}
