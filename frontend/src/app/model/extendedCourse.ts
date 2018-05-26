import { Course } from './course';

export class ExtendedCourse extends Course {
    constructor(
        id: number,
        day: string,
        begin: string,
        end: string,
        price: number,
        TrainingId: number,
        public isSelected: boolean
    ) { super(id, day, begin, end, price, TrainingId); }
}
