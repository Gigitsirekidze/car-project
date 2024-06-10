import { Column, Entity, PrimaryColumn } from 'typeorm';
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
}
