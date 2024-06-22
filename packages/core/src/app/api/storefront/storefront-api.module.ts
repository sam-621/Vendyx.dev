import { Module } from '@nestjs/common';

import {
  OrderResolver,
  PaymentMethodResolver,
  ProductResolver,
  ShippingMethodResolver,
  VariantResolver
} from './resolvers';
import { COMMON_RESOLVERS } from '../common/common-resolvers';

import { ServiceModule } from '@/app/service';

@Module({
  imports: [ServiceModule],
  providers: [
    ...COMMON_RESOLVERS,
    OrderResolver,
    ProductResolver,
    VariantResolver,
    PaymentMethodResolver,
    ShippingMethodResolver
  ]
})
export class StorefrontApiModule {}
