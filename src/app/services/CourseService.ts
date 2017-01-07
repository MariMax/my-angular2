import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Author } from './AuthorService';

@Injectable()
export class CourseService {
    courses: Course[] = [];

    constructor() {
        this.courses = [
            new Course(1, 'Course 1', 'description 1', 90, new Date(), null),
            new Course(2, 'Course 2', 'description 2', 110, new Date(), null),
            new Course(3, 'Course 3', 'description 3', 120, new Date(), null),
            new Course(4, 'Course 4', 'description 4', 130, new Date(), null),
        ];
    }

    getCoursesList(): Observable<Course[]> {
        return Observable.create((observer: Observer<Array<Course>>) => {
            observer.next(this.courses);
            observer.complete();
        });
    }

    deleteCourse(course: Course): Observable<void> {
        return Observable.create((observer: Observer<void>) => {
            this.courses = this.courses.filter(x => x.id !== course.id);
            observer.complete();
        });
    }

    searchCourses(query: string): Observable<Course[]> {
        return Observable.create((observer: Observer<Array<Course>>) => {
            if (query) {
                this.courses = this.courses.filter(x => x.title.search(new RegExp(query, 'i')) != -1);
            }
            observer.next(this.courses);
            observer.complete();
        });
    }
}

export class Course {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public duration: number,
        public date: Date,
        public authors: Author[]
    )
    { }
}