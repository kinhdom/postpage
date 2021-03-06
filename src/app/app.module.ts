import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AddaccountComponent } from './addaccount/addaccount.component';
import { ScanComponent } from './scan/scan.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PostpageService } from './postpage.service';
import { DashboardserviceService } from './dashboardservice.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AddaccountComponent,
    ScanComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [PostpageService, DashboardserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
