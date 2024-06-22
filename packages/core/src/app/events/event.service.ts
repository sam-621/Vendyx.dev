import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { OrderEvent } from './events';

/**
 * 1.
 */
@Injectable()
export class EventService {
  @OnEvent(OrderEvent.PAID)
  handleOrderPaidEvent1(payload: any) {
    console.log('Order paid 1', payload);
  }

  @OnEvent(OrderEvent.PAID)
  handleOrderPaidEvent2(payload: any) {
    console.log('Order paid 2', payload);
  }
}
