import { Category } from '@prisma/client';
export declare class CreateStudentDto {
    studentId: string;
    name: string;
    marks: number;
    category: Category;
    applicationDate: string;
    preferredCourse: number;
}
