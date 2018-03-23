import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.component.html',
  styleUrls: ['./addaccount.component.css']
})
export class AddaccountComponent implements OnInit {
  textareahuy;
  constructor() { }

  ngOnInit() {
  }
  onFormSubmit(formvalue) {
    let html = formvalue.value.code
    let htmltext = this.html2text(html)
    let x = htmltext.indexOf('EAAAA')
    this.textareahuy = htmltext.substr(x, 172)
  }
  html2text(html) {
    var tag = document.createElement('div');
    tag.innerHTML = html;
    return tag.innerText;
  }


}
