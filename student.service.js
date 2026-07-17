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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StudentService = class StudentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingStudent = await this.prisma.student.findUnique({
            where: {
                studentId: data.studentId,
            },
        });
        if (existingStudent) {
            throw new common_1.BadRequestException('Student ID already exists.');
        }
        const course = await this.prisma.course.findUnique({
            where: {
                id: data.preferredCourse,
            },
        });
        if (!course) {
            throw new common_1.BadRequestException('Selected course does not exist.');
        }
        return this.prisma.student.create({
            data: {
                studentId: data.studentId,
                name: data.name,
                marks: data.marks,
                category: data.category,
                applicationDate: new Date(data.applicationDate),
                course: {
                    connect: {
                        id: data.preferredCourse,
                    },
                },
            },
            include: {
                course: true,
            },
        });
    }
    findAll() {
        return this.prisma.student.findMany({
            include: {
                course: true,
                allocation: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.student.findUnique({
            where: {
                id,
            },
            include: {
                course: true,
                allocation: true,
            },
        });
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentService);
//# sourceMappingURL=student.service.js.map