import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { Course } from '../../course';
import { Entry } from '../../entry';
import { EntryService } from '../../entry-service.service';
import { CourseService } from '../../course-service.service';
import { UserService } from '../../user-service.service';
import { element } from 'protractor';
import { EntryDetailsStudent } from '../../entry-detalis-student';
import { EntryDetailsTeacher } from '../../entry-details-teacher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


  courses: Course[];
  course: Course;
  selectedCourse: Course;
  selectedTeacherCourse: Course;
  freeCourses: Course[] = [];
  entries: Entry[] = [];
  unatendedCourses: Course[] = [];
  teachers: User[] = [];
  isTeaching: boolean = true;
  loggedUser: User;
  teacherCourse: Course;
  courseOption: Course;
  entriesLoaded: boolean = false;
  entryDetalis: EntryDetailsStudent[] = [];
  entriesTeachers:EntryDetailsTeacher[] =[];
  teachersStudents:User[] =[];
  teachersSelectedStudent:User;
  newGrade:number;

  constructor(private thisRoute: ActivatedRoute, private entryService: EntryService, private coursesService: CourseService,
    private UserService: UserService) {}

  ngOnInit() {
  
    if (!this.loggedUser.isTeacher) {
      this.UserService.getTeachers().subscribe((_teachers: User[]) => {
        this.teachers = _teachers;

        this.coursesService.getCourses().subscribe((res: Course[]) => {
          res.forEach(element => {
            this.unatendedCourses.push(element);
          });
          this.courses = res;
          this.getEntriesForLoggedStudent();
        });
      });
    }
    
  }


  getEntriesForLoggedStudent() {
    this.entryService.getEntriesForStudent(this.loggedUser.id).subscribe((_entries: Entry[]) => {
      if (_entries.length > 0) {
        let unatCoursesAux: Course[] = [];
        this.unatendedCourses.forEach((element: Course) => {

          let isContained: boolean = false;

          let entryDetalisIndex: number = 0;

          _entries.forEach((entry: Entry) => {
            if (entry.id_course == element.id) {
              isContained = true;
              this.entryDetalis.push(new EntryDetailsStudent(this.diplayCourseName(entry), this.displayTeacherName(entry), entry.grade));
            }
            entryDetalisIndex++;
          });
          if (!isContained) {
            unatCoursesAux.push(element);
          }
        });
        this.entries = _entries;
        this.unatendedCourses = unatCoursesAux;
      }
      this.entriesLoaded = true;
    });
  }

  getEntriesForLoggedTeacher(){
    this.entryService.getEntriesForTeacher(this.course.id).subscribe((_entries:Entry[])=>{
      
      this.UserService.getStudents().subscribe((_students:User[])=>{
        _entries.forEach((_entry:Entry)=>{
          _students.forEach((_student:User) =>{
            if(_entry.id_student == _student.id){
              this.entriesTeachers.push(new EntryDetailsTeacher(_student.name,_entry.grade));
              this.teachersStudents.push(_student);
            }
          });
        });
      });
      this.entries = _entries;
    });
  }

  getFreeCourses() {
    this.coursesService.getFreeCourses().subscribe((_freeCourses: Course[]) => {
      this.freeCourses = _freeCourses;

    });
  }
  getTeachedCurse() {

    if (this.course === undefined)
      this.isTeaching = false;

  }
  onSelectCourseClick() {

 

    if (!(this.loggedUser.isTeacher)) {
      if (!(this.selectedCourse === null) || (this.selectedCourse === undefined)) {
        let _entry = {
          id_course: this.selectedCourse.id,
          id_student: this.loggedUser.id,
          grade: 0

        };
        this.entryService.addEntry(_entry).subscribe(res => {
          window.location.reload();
        });

      }

    }
    else {

      this.selectedTeacherCourse.id_teacher = this.loggedUser.id;
      this.coursesService.updateCourse(this.selectedTeacherCourse).subscribe(res => {
        window.location.reload();

      });

    }

  }

  diplayCourseName(entry: Entry): string {
    let returnString: string;
    this.courses.forEach(_course => {
      if (_course.id == entry.id_course)
        returnString = _course.name;
    });

    return returnString;


  }

  displayTeacherName(entry: Entry): string {
    let returnString: string;

    this.courses.forEach(_course => {
      if (entry.id_course == _course.id)
        this.teachers.forEach(_teacher => {
          if (_course.id_teacher == _teacher.id)
            returnString = _teacher.name;
        });
    });

    return returnString;
  }

  getIsTeaching(): boolean {

    return this.isTeaching;
  }

  updateGrade(){
    this.entries.forEach(_entry=>
    {
      if(_entry.id_student == this.teachersSelectedStudent.id){
        _entry.grade = this.newGrade;
        this.entryService.updateEntry(_entry).subscribe(res=>{
          window.location.reload();
        });
      }
    });
  }


}