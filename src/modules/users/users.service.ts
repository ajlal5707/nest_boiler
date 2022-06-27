import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';
import { GetUsersDto } from './dto/get.users.dto';
@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {

    let user = await this.userRepository.findByEmail(createUserDto.email)

    if (user) return new BadRequestException('USER_WITH_EMAIL_ALREADY_EXIST');

    const newUser = new User()
    newUser.user_name = createUserDto.user_name
    newUser.password = createUserDto.password
    newUser.email = createUserDto.email
    newUser.role = "user"
    let createdUser = await this.userRepository.save(newUser)

    return createdUser

  }

  async findAll(getUsersDto: GetUsersDto) {

    const take = getUsersDto.page
    const skip = getUsersDto.limit
    const search = getUsersDto.search

    let whereCondition = {}
    if (search) {
      whereCondition = { user_name: search }
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

  async findOne(id: number) {

    const user = await this.userRepository.findOne({ where: { id: id } })

    console.log(user)

    if (!user) return new BadRequestException('User not found with given ID');

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    let { user_name, email, password } = updateUserDto

    let updateAble = {}
    if (user_name) {
      updateAble = { ...updateAble, user_name: user_name }
    }
    if (email) {
      updateAble = { ...updateAble, email: email }
    }
    if (password) {
      updateAble = { ...updateAble, password: password }
    }

    const result = await this.userRepository.createQueryBuilder()
      .update(updateAble)
      .where({
        id: id,
      })
      .execute()

    return result
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
