import { Component, OnInit } from '@angular/core';
import { PostpageService } from '../postpage.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content;
  pages;
  
  isLogin: boolean = false
  arrAcc = []
  // arrSelectedAcc = []
  selectedAcc = false
  urlSelectedImage = '';
  percentUploadImage: number

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
          this.arrAcc.push(acc_json)
        });
      })
    }
  }
  onClickAcc(event, acc) {
    acc.info.isSelected = !acc.info.isSelected
    acc.info.isSelected ? event.target.attributes[1].value = 'list-group-item active' : event.target.attributes[1].value = 'list-group-item'
  }
  onFileSelected(event) {
    let selectedImage = event.target.files[0]
    let filepath = 'postpage/' + new Date().getFullYear().toString() + '/' + new Date().getMonth().toString() + '/' + new Date().getDate().toString() + Math.random().toString()
    let taskUpload = this._storage.upload(filepath, selectedImage)
    taskUpload.percentageChanges().subscribe(percent => {
      this.percentUploadImage = Math.round(percent)
    })
    taskUpload.downloadURL().subscribe(url => {
      this.urlSelectedImage = url;
    })
  }
  onFormSubmit(form) {
    let arrSelectedAcc = []
    let content = form.value.content

    let image = this.urlSelectedImage;
    if (form.value.pages) {
      let pages_string = form.value.pages; //Chuyển thành mảng các id page
      var pages_array = pages_string.split("\n")
    }


    // let accs; // Chuyển thành mảng các acc có isSelected = true
    this.arrAcc.forEach(acc => {
      if (acc.info.isSelected) {
        arrSelectedAcc.push(acc)
        
      }
    });
    this._postpageservice.postConent(content, image, pages_array, arrSelectedAcc)

  }
}
