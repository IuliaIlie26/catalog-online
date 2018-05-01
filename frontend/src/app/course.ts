export class Course {



    constructor(public id:number = 0, public id_teacher:number=0, public name:string ="") {

        this.id_teacher = id_teacher;
        this.name=name;

    }
    clone() {
        return new Course(this.id,
           this.id_teacher,
            this.name);
    }

}