import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
export declare class CourseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCourseDto): import("@prisma/client").Prisma.Prisma__CourseClient<{
        id: number;
        courseName: string;
        totalSeats: number;
        generalSeats: number;
        obcSeats: number;
        scSeats: number;
        stSeats: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        students: {
            createdAt: Date;
            id: number;
            name: string;
            studentId: string;
            marks: number;
            category: import("@prisma/client").$Enums.Category;
            applicationDate: Date;
            preferredCourse: number;
        }[];
        allocations: {
            id: number;
            studentId: number;
            courseId: number;
            status: string;
            allocatedAt: Date;
        }[];
    } & {
        id: number;
        courseName: string;
        totalSeats: number;
        generalSeats: number;
        obcSeats: number;
        scSeats: number;
        stSeats: number;
    })[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__CourseClient<({
        students: {
            createdAt: Date;
            id: number;
            name: string;
            studentId: string;
            marks: number;
            category: import("@prisma/client").$Enums.Category;
            applicationDate: Date;
            preferredCourse: number;
        }[];
        allocations: {
            id: number;
            studentId: number;
            courseId: number;
            status: string;
            allocatedAt: Date;
        }[];
    } & {
        id: number;
        courseName: string;
        totalSeats: number;
        generalSeats: number;
        obcSeats: number;
        scSeats: number;
        stSeats: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__CourseClient<{
        id: number;
        courseName: string;
        totalSeats: number;
        generalSeats: number;
        obcSeats: number;
        scSeats: number;
        stSeats: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
