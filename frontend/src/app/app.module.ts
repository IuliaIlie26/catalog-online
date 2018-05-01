import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';

import { UserService } from './user-service.service';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseService } from './course-service.service';
import { EntryService } from './entry-service.service';




@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    PagesModule,
    AuthModule,
    BrowserModule,
    ClarityModule,
    NgbModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, CourseService, EntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
