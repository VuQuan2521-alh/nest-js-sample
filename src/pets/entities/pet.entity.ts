import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.pets, { onDelete: 'SET NULL' })
  user: User;
}
