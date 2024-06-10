import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CarEntity } from '../../car/entities/car.entity';
import { Gender } from '../enums';

@Entity('owner')
export class OwnerEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

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
}
