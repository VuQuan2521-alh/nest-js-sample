import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @OneToOne(() => User, (user) => user.contact, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
