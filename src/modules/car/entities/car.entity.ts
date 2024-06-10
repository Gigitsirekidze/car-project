import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
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

  @ManyToOne(() => OwnerEntity, (owner) => owner.cars, {
    nullable: true,
  })
  owner?: OwnerEntity;
}
