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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        let user = await this.userRepository.findByEmail(createUserDto.email);
        if (user)
            return new common_1.BadRequestException('USER_WITH_EMAIL_ALREADY_EXIST');
        const newUser = new user_entity_1.User();
        newUser.user_name = createUserDto.user_name;
        newUser.password = createUserDto.password;
        newUser.email = createUserDto.email;
        newUser.role = "user";
        let createdUser = await this.userRepository.save(newUser);
        return createdUser;
    }
    async findAll(getUsersDto) {
        const take = getUsersDto.page;
        const skip = getUsersDto.limit;
        const search = getUsersDto.search;
        let whereCondition = {};
        if (search) {
            whereCondition = { user_name: search };
        }
        const [list, count] = await this.userRepository.createQueryBuilder('users')
            .select(['users.user_name', 'users.email', 'users.role'])
            .where(whereCondition)
            .skip((take - 1) * skip)
            .take(skip)
            .orderBy({ 'id': 'ASC' }).getManyAndCount();
        return {
            list,
            count,
        };
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id: id } });
        console.log(user);
        if (!user)
            return new common_1.BadRequestException('User not found with given ID');
        return user;
    }
    async update(id, updateUserDto) {
        let { user_name, email, password } = updateUserDto;
        let updateAble = {};
        if (user_name) {
            updateAble = Object.assign(Object.assign({}, updateAble), { user_name: user_name });
        }
        if (email) {
            updateAble = Object.assign(Object.assign({}, updateAble), { email: email });
        }
        if (password) {
            updateAble = Object.assign(Object.assign({}, updateAble), { password: password });
        }
        const result = await this.userRepository.createQueryBuilder()
            .update(updateAble)
            .where({
            id: id,
        })
            .execute();
        return result;
    }
    async remove(id) {
        return await this.userRepository.delete(id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map