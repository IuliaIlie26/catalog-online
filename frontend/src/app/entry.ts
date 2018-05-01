export class Entry {



    constructor(public id = 0, public id_course: number = 0, public id_student: number = 0, public grade: number = 0) {

        this.id_course = id_course;
        this.id_student = id_student;
        this.grade = 0;

    }
    clone() {
        return new Entry(this.id,
            this.id_course,
            this.id_student,
            this.grade);
    }

}