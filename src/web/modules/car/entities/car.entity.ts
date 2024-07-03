import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { DealershipEntity } from '../../dealership/entities';
import { OwnerEntity } from '../../owner/entities';
import { CarBrands } from '../enums/car-brands';

@Entity('car')
export class CarEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'brand' })
  brand: CarBrands;

  @Column({ name: 'date' })
  date: Date;

  @Column({ name: 'millage', nullable: true })
  millage?: number;

  @JoinColumn({ name: 'ownerId' })
  @ManyToOne(() => OwnerEntity, (owner) => owner.cars, {
    nullable: true,
  })
  owner?: OwnerEntity;

  @JoinTable({ name: 'car_dealership' })
  @ManyToMany(() => DealershipEntity, (dealership) => dealership.cars, {
    nullable: true,
  })
  dealerships?: DealershipEntity[];
}
