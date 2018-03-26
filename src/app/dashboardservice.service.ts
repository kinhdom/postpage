import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

const localToken = localStorage.getItem('token')

@Injectable()
export class DashboardserviceService {

  constructor(private _db: AngularFireDatabase) { }
  getResult() {
    return this._db.list('postpage/dashboard/' + localToken).valueChanges()
  }

}
