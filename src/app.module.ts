import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import config from '../ormconfig';
import { User } from './modules/users/entities/user.entity';
import { UserRepository } from './modules/users/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,UserRepository]),
    TypeOrmModule.forRoot(config),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
