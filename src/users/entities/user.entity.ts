import { Contact } from 'src/contact/entities/contact.entity';
import { Meeting } from 'src/meeting/entities/meeting.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  full_name: string;

  @Column({ default: false })
  confirmed: boolean;

  @ManyToOne(() => User, (user) => user.directReports, { onDelete: 'SET NULL' })
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  directReports: User[];

  @OneToOne(() => Contact, (concat) => concat.user, { eager: true })
  @JoinColumn()
  contact: Contact;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @ManyToMany(() => Meeting, (meet) => meet.attendees)
  @JoinTable()
  meets: Meeting[];
}
