import { Column, ManyToOne, OneToOne, Entity as TypeOrmEntity } from 'typeorm';

import { Entity } from './entity';
import { OrderEntity } from './order.entity';
import { PaymentMethodEntity } from './payment-method.entity';

@TypeOrmEntity('payment')
export class PaymentEntity extends Entity {
  /**
   * The transaction id of the payment. Is nullable because the payment might not have been processed yet.
   */
  @Column('varchar', { name: 'transaction_id', nullable: true })
  transactionId: string;

  /**
   * The total amount of the payment
   */
  @Column('int')
  amount: number;

  @OneToOne(() => OrderEntity, (o) => o.payment)
  order: OrderEntity;

  @ManyToOne(() => PaymentMethodEntity, (m) => m.payments)
  method: PaymentMethodEntity;
}
