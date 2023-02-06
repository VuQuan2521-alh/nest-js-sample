import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  uri: string;

  @ManyToMany(() => User, (user) => user.meets)
  attendees: User[];
}
