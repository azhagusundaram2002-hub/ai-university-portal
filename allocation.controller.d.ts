import { AllocationService } from './allocation.service';
export declare class AllocationController {
    private readonly allocationService;
    constructor(allocationService: AllocationService);
    allocateStudents(): Promise<any[]>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        student: {
            createdAt: Date;
            id: number;
            name: string;
            studentId: string;
            marks: number;
            category: import("@prisma/client").$Enums.Category;
            applicationDate: Date;
            preferredCourse: number;
        };
        course: {
            id: number;
            courseName: string;
            totalSeats: number;
            generalSeats: number;
            obcSeats: number;
            scSeats: number;
            stSeats: number;
        };
    } & {
        id: number;
        studentId: number;
        courseId: number;
        status: string;
        allocatedAt: Date;
    })[]>;
}
