import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { CarEntity } from '../../car/entities/car.entity';

@Entity('dealership')
export class DealershipEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'country' })
  country: string;

  @ManyToMany(() => CarEntity, (car) => car.dealerships, {
    nullable: true,
  })
  cars?: CarEntity[];
}
