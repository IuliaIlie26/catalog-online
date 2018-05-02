import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { Course } from '../../course';
import { CourseService } from '../../course-service.service';
import { HomeComponent } from '../home/home.component';
import { parse } from 'querystring';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser: User;
  displayString: String;
  course: Course;
  executeCourseUpdate: boolean = true;
  actualDate = new Date();
  constructor(private thisRoute: ActivatedRoute, private CourseService: CourseService) { }
  
  @ViewChild(HomeComponent) home: HomeComponent;
  ngOnInit() {
    this.thisRoute.queryParams.subscribe(user => {

      let parsedBool:boolean;
      switch(user.isTeacher){
        case "true":{
          parsedBool = true;
          break;
        }
        case "false":{
          parsedBool =false;
        }
      }
      this.loggedUser = new User(user.id,user.name,user.email,parsedBool,user.username,user.password);
      this.home.loggedUser = this.loggedUser;
      this.displayString = this.displayNameAndCourse();
     

      
      if (this.loggedUser.isTeacher)
        this.CourseService.getCourseForTeacher(this.loggedUser.id).subscribe((res: Course) => {
           if (this.executeCourseUpdate) {
            this.course = res[0];
            this.home.course = res[0];
            this.home.getTeachedCurse();
            this.home.getFreeCourses();
            this.home.getEntriesForLoggedTeacher();
            this.displayString = this.displayNameAndCourse();
            this.executeCourseUpdate = false;
           }
        });
    });

  }

  displayNameAndCourse(): string {
    let returnedString: string;

    if (this.loggedUser.isTeacher) {
      if (!(this.course === undefined)) {
        returnedString = "Buna ziua, " + this.loggedUser.name + "! Cursul predat de dvs. este: " + this.course.name;
      } else
        returnedString = "Buna ziua, " + this.loggedUser.name + "! Nu predati niciun curs la momentul de fata.";

    }
    else {
      returnedString = "Salut, " + this.loggedUser.name;
    }
    return returnedString;
  }

}
