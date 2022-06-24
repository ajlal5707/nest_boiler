import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
