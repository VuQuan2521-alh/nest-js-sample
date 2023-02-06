import { Pet } from './entities/pet.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepo: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto) {
    try {
      const result = this.petRepo.create(createPetDto);
      await this.petRepo.save(result);

      return { msg: 'created a pet', data: result };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const result = await this.petRepo.find();
      return { msg: 'this all pet', data: result };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet, ${JSON.stringify(updatePetDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
