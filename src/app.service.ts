import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact/entities/contact.entity';
import { Meeting } from './meeting/entities/meeting.entity';
import { Pet } from './pets/entities/pet.entity';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
  ) {}

  seed() {
    return 'helle send';
  }

  getHello(): string {
    return 'Hello World!';
  }
}
