import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import {
  PRISMA_FOR_ADMIN,
  PRISMA_FOR_SHOP,
  PrismaForAdminClientProvider,
  PrismaForShopClientProvider
} from './prisma-clients';
import {
  AssetRepository,
  OptionRepository,
  PaymentMethodRepository,
  ProductRepository,
  ShopRepository,
  UserRepository,
  VariantRepository
} from './repositories';

const REPOSITORIES = [
  UserRepository,
  ShopRepository,
  ProductRepository,
  VariantRepository,
  OptionRepository,
  AssetRepository,
  PaymentMethodRepository
];

export const CLS_SHOP_ID = 'shop_id';
export const CLS_OWNER_ID = 'owner_id';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [PrismaForShopClientProvider, PrismaForAdminClientProvider, ...REPOSITORIES],
  exports: [PRISMA_FOR_SHOP, PRISMA_FOR_ADMIN, ...REPOSITORIES]
})
export class PersistanceModule {}
