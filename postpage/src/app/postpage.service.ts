import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostpageService {

  constructor(private _http: Http) { }
  viewSource(){
    this._http.get('')
  }
}
