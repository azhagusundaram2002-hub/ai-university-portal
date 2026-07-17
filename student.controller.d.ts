import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
export declare class StudentController {
    private readonly service;
    constructor(service: StudentService);
    create(dto: CreateStudentDto): Promise<{
        course: {
            id: number;
            courseName: string;
            totalSeats: number;
            generalSeats: number;
            obcSeats: number;
            scSeats: number;
            stSeats: number;
        } | null;
    } & {
        createdAt: Date;
        id: number;
        name: string;
        studentId: string;
        marks: number;
        category: import("@prisma/client").$Enums.Category;
        applicationDate: Date;
        preferredCourse: number;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        course: {
            id: number;
            courseName: string;
            totalSeats: number;
            generalSeats: number;
            obcSeats: number;
            scSeats: number;
            stSeats: number;
        } | null;
        allocation: {
            id: number;
            studentId: number;
            courseId: number;
            status: string;
            allocatedAt: Date;
        } | null;
    } & {
        createdAt: Date;
        id: number;
        name: string;
        studentId: string;
        marks: number;
        category: import("@prisma/client").$Enums.Category;
        applicationDate: Date;
        preferredCourse: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__StudentClient<({
        course: {
            id: number;
            courseName: string;
            totalSeats: number;
            generalSeats: number;
            obcSeats: number;
            scSeats: number;
            stSeats: number;
        } | null;
        allocation: {
            id: number;
            studentId: number;
            courseId: number;
            status: string;
            allocatedAt: Date;
        } | null;
    } & {
        createdAt: Date;
        id: number;
        name: string;
        studentId: string;
        marks: number;
        category: import("@prisma/client").$Enums.Category;
        applicationDate: Date;
        preferredCourse: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
