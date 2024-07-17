import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { CarEntity } from '../../car/entities/car.entity';
import { UserEntity } from '../../user/entities';
import { Gender } from '../enums';
import { BalanceEntity } from './balance.entity';

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
    nullable: false,
    cascade: true,
  })
  user?: UserEntity;

  @OneToMany(() => BalanceEntity, (balance) => balance.owner, {
    cascade: true,
    nullable: true,
  })
  balances?: BalanceEntity[];
}
