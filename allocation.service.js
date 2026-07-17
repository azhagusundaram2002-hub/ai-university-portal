"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AllocationService = class AllocationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async allocateStudents() {
        const students = await this.prisma.student.findMany({
            include: {
                course: true,
            },
            orderBy: [
                {
                    marks: 'desc',
                },
                {
                    applicationDate: 'asc',
                },
            ],
        });
        const allocations = [];
        for (const student of students) {
            const existingAllocation = await this.prisma.allocation.findUnique({
                where: {
                    studentId: student.id,
                },
            });
            if (existingAllocation) {
                continue;
            }
            let allocated = false;
            let allocatedCourse = await this.prisma.course.findUnique({
                where: {
                    id: student.preferredCourse,
                },
            });
            if (!allocatedCourse)
                continue;
            const allocateSeat = async (course) => {
                switch (student.category) {
                    case 'GENERAL':
                        if (course.generalSeats > 0) {
                            await this.prisma.course.update({
                                where: { id: course.id },
                                data: {
                                    generalSeats: {
                                        decrement: 1,
                                    },
                                },
                            });
                            return true;
                        }
                        break;
                    case 'OBC':
                        if (course.obcSeats > 0) {
                            await this.prisma.course.update({
                                where: { id: course.id },
                                data: {
                                    obcSeats: {
                                        decrement: 1,
                                    },
                                },
                            });
                            return true;
                        }
                        break;
                    case 'SC':
                        if (course.scSeats > 0) {
                            await this.prisma.course.update({
                                where: { id: course.id },
                                data: {
                                    scSeats: {
                                        decrement: 1,
                                    },
                                },
                            });
                            return true;
                        }
                        break;
                    case 'ST':
                        if (course.stSeats > 0) {
                            await this.prisma.course.update({
                                where: { id: course.id },
                                data: {
                                    stSeats: {
                                        decrement: 1,
                                    },
                                },
                            });
                            return true;
                        }
                        break;
                }
                return false;
            };
            allocated = await allocateSeat(allocatedCourse);
            if (!allocated) {
                const otherCourses = await this.prisma.course.findMany({
                    where: {
                        id: {
                            not: student.preferredCourse,
                        },
                    },
                    orderBy: {
                        id: 'asc',
                    },
                });
                for (const course of otherCourses) {
                    const success = await allocateSeat(course);
                    if (success) {
                        allocated = true;
                        allocatedCourse = course;
                        break;
                    }
                }
            }
            const allocation = await this.prisma.allocation.create({
                data: {
                    studentId: student.id,
                    courseId: allocatedCourse.id,
                    status: allocated ? 'ALLOCATED' : 'WAITLISTED',
                },
                include: {
                    student: true,
                    course: true,
                },
            });
            allocations.push(allocation);
        }
        return allocations;
    }
    findAll() {
        return this.prisma.allocation.findMany({
            include: {
                student: true,
                course: true,
            },
        });
    }
};
exports.AllocationService = AllocationService;
exports.AllocationService = AllocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AllocationService);
//# sourceMappingURL=allocation.service.js.map