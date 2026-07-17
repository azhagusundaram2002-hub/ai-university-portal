import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    username: string;
    email: string;
    role: UserRole;
    employeeId?: string;
}
