import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    user_name: string;
    password: string;
    email: string;
    role: string;
}
