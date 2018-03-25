import { Component, OnInit } from '@angular/core';
import { PostpageService } from '../postpage.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogin: boolean = false
  arrAcc = []
  selectedAcc = false
  selectedImage: any;

  constructor(private _postpageservice: PostpageService, private _storage: AngularFireStorage) { }
  ngOnInit() {
    let token = localStorage.getItem('token')
    if (token) {
      this.isLogin = true
      this._postpageservice.getListAcount().subscribe(arrInfo => {
        arrInfo.forEach(acc => {
          let acc_string = JSON.stringify(acc)
          let acc_json = JSON.parse(acc_string)
          acc_json.info.isSelected = false
          this.arrAcc.push(acc_json.info)
        });
      })
    }
  }
  onClickAcc(event, acc) {
    acc.isSelected = !acc.isSelected
    acc.isSelected ? event.target.attributes[1].value = 'list-group-item active' : event.target.attributes[1].value = 'list-group-item'
  }
  onFileSelected(event) {
    this.selectedImage = event.target.files[0]
    let filepath = 'postpage/' + new Date().getFullYear().toString() + '/' + new Date().getMonth().toString() + '/' + new Date().getDate().toString() + Math.random().toString()
    let taskUpload = this._storage.upload(filepath, this.selectedImage)
    taskUpload.downloadURL().subscribe(url=>{
      console.log(url)
    })
  }
}
