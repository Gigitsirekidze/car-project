import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { OwnerEntity } from './owner.entity';

@Entity('balance')
export class BalanceEntity {
  @PrimaryColumn({ name: 'id' })
  id: number;

  @Column({ name: 'currency' })
  currency: string;

  @Column({ name: 'amount' })
  amount: number;

  @ManyToOne(() => OwnerEntity, (owner) => owner.balances, {
    nullable: false,
  })
  owner?: OwnerEntity;
}
