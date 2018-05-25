import { Course } from './course';

export class ExtendedCourse extends Course {
    constructor(
        id: number,
        begin: string,
        end: string,
        price: number,
        TrainingId: number,
        public isSelected: boolean
    ) { super(id, begin, end, price, TrainingId); }
}
