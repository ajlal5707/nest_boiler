import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get.users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User | import("@nestjs/common").BadRequestException>;
    findAll(getUsersDto: GetUsersDto): Promise<{
        list: import("./entities/user.entity").User[];
        count: number;
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").User | import("@nestjs/common").BadRequestException>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
