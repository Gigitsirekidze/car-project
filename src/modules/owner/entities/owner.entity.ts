import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { CarEntity } from '../../car/entities/car.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Gender } from '../enums';

@Entity('owner')
export class OwnerEntity {
  @PrimaryColumn({ name: 'username' })
  username: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'gender' })
  gender: Gender;

  @Column({ name: 'age' })
  age: number;

  @OneToMany(() => CarEntity, (car) => car.owner, {
    cascade: true,
    nullable: true,
  })
  cars?: CarEntity[];

  @OneToOne(() => UserEntity, (user) => user.owner, {
    nullable: true,
  })
  user?: UserEntity;
}
