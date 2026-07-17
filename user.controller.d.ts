import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private service;
    constructor(service: UserService);
    create(createUserDto: CreateUserDto): import("@prisma/client").Prisma.Prisma__UserClient<{
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        employeeId: string | null;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        username: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        employeeId: string | null;
        createdAt: Date;
        id: number;
    }[]>;
}
