import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const result = this.userRepo.create(createUserDto);
      await this.userRepo.save(result);
      return { msg: 'created an user success', data: result };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const result = await this.userRepo.find();
      return { msg: 'this all info user', data: result };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.userRepo.findOne({ where: { _id: id } });
      if (!result)
        throw new HttpException('user not found by id', HttpStatus.NOT_FOUND);

      return { msg: 'this an user', data: result };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userRepo.findOne({ where: { _id: id } });
      if (!result)
        throw new HttpException('user not found by id', HttpStatus.NOT_FOUND);

      await this.userRepo.update(id, updateUserDto);
      return {
        msg: 'updated user success',
        data: { ...result, ...updateUserDto },
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userRepo.findOne({ where: { _id: id } });
      if (!result)
        throw new HttpException('user not found by id', HttpStatus.NOT_FOUND);

      await this.userRepo.remove(result);
      return { msg: 'deleted success', data: null };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
