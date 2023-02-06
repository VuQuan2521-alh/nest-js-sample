import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { ValidENVModule } from './valid.env.module';
import { DatabaseModule } from './database.module';
import { ContactModule } from './contact/contact.module';
import { MeetingModule } from './meeting/meeting.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Pet } from './pets/entities/pet.entity';
import { Contact } from './contact/entities/contact.entity';
import { Meeting } from './meeting/entities/meeting.entity';

@Module({
  imports: [
    ValidENVModule,
    DatabaseModule,
    UsersModule,
    PetsModule,
    ContactModule,
    MeetingModule,
    TypeOrmModule.forFeature([Contact, User, Pet, Meeting]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
