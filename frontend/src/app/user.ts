export class User {
    constructor(public id = 0 ,public name:string = '', public email:string ='', public isTeacher = false, public username:string ='',public password:string ='') {
        
        this.name = name;
        this.email = email;
        this.isTeacher = isTeacher;
        this.username = username;
        this.password = password;
    }
    clone(){
        return new User(this.id,this.name = name,
        this.email  ,
        this.isTeacher ,
        this.username,
        this.password );
    }
    
  }