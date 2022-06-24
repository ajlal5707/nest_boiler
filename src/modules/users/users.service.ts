import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {

    let user = await this.userRepository.findByEmail(createUserDto.email)

    console.log(user)

    return user

    // let user = await this.userRepository.findOne({ where: { email: createUserDto.email } })

    // if (!user) {
    //   const newUser = new User()
    //   newUser.user_name = createUserDto.user_name
    //   newUser.password = createUserDto.password
    //   newUser.email = createUserDto.email
    //   newUser.role = "user"
    //   let createdUser = await this.userRepository.save(newUser)

      // return createdUser

    // }

    // return 

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
