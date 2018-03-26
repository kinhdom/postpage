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
  arrAcc = [];
  msg = [];
  // arrSelectedAcc = []
  selectedAcc = false
  urlSelectedImage = '';
  percentUploadImage: number
  access_token = '';
  constructor(private _postpageservice: PostpageService, private _storage: AngularFireStorage) { }
  ngOnInit() {
    let token = localStorage.getItem('token')
    if (token) {
      this.isLogin = true
      this._postpageservice.getListAcount().subscribe(arrInfo => {
        arrInfo.forEach(acc => {
          let acc_string = JSON.stringify(acc)
          let acc_json = JSON.parse(acc_string)
          this.access_token = acc_json.access_token
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
    let arrPages = []
    let content = form.value.content

    let image = this.urlSelectedImage;

    // let accs; // Chuyển thành mảng các acc có isSelected = true
    this.arrAcc.forEach(acc => {
      if (acc.info.isSelected) {
        arrSelectedAcc.push(acc)
      }
    });


    if (form.value.pages) {
      let pages_string = form.value.pages; //Chuyển thành mảng các id page
      var pages_array = pages_string.split("\n")
      for (var i = 0; i < pages_array.length; i++) {
        if (i > arrSelectedAcc.length - 1) {
          var j = i % arrSelectedAcc.length
        } else {
          var j = i
        }
        let page = pages_array[i]
        let acc = arrSelectedAcc[j]
        this._postpageservice.getInfoPage(page, this.access_token).subscribe(infopage => {
          if (infopage.can_post) {

            this._postpageservice.postConentNew(content, image, page, acc)
          } else {
            this.msg.push('Fail: ' + page)
            console.log(page + ' can not post')
          }
        })
        // pages_array.forEach(uidPage => {
        //   this._postpageservice.getInfoPage(uidPage, this.access_token).subscribe(infopage => {
        //     if (infopage.can_post) {
        //       this._postpageservice.postConentNew(content, image, uidPage, arrSelectedAcc[j])
        //     } else {
        //       console.log(uidPage + ' can not post')
        //     }
        //   })
        // });
      }

      // this._postpageservice.postConent(content, image, arrPages, arrSelectedAcc)

    }else{
      this.msg.push('Nhập UID page cần đăng')
    }




  }
}
