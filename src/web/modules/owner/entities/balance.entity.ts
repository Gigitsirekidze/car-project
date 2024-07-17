import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OwnerEntity } from './owner.entity';

@Entity('balance')
export class BalanceEntity {
  @PrimaryColumn({ name: 'uuid' })
  uuid: string;

  @Column({ name: 'currency' })
  currency: string;

  @Column({ name: 'amount' })
  amount: number;

  @JoinColumn({name: 'owner_id'})
  @ManyToOne(() => OwnerEntity, (owner) => owner.balances)
  owner: OwnerEntity;
}
