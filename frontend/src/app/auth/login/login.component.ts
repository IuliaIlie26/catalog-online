import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user-service.service';
import { User } from '../../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  username2: string;
  password2: string;
  status: string;
  status2: string;
  password3: string;

  name: string;
  email: string;
  isTeacher: boolean;

  private data: User[] = new Array(50);
  private index: number = 0;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getUsers().subscribe((result: User[]) => {

      this.data = result;

    });

    this.status = "";
    this.status2 = "";
  }

  onClick() {

    if (!(this.username && this.password))
      this.status = "Introdu username-ul si parola!";
    else {

      this.status = 'Eroare la login!';
      this.data.forEach(element => {
        if ((this.username === element.username) && (this.password === element.password)) {
          let user = JSON.stringify(element);
          this.router.navigate(['/pages/home'], { queryParams: element });
        }
      });
    }
  }

  onRegisterClick() {

    let user = {
      name: this.name,
      username: this.username2,
      password: this.password2,
      email: this.email,
      isTeacher: this.isTeacher
    };

    this.userService.createUser(user).subscribe(res => {
      if (!(this.username2 && this.password3 && this.name && this.email && this.password2)) { this.status2 = "Completeaza toate campurile!"; }
      else if (this.password3 != this.password2) {
        this.status2 = "Parolele nu coincid!";
      } else{
        this.router.navigate(['/pages/home'], { queryParams: res });
      }
    });
  }
}

