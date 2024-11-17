import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Shop } from '@prisma/client';

import {
  CreateShopInput,
  ListInput,
  ListResponse,
  UpdateShopInput,
  UserJwtAuthGuard
} from '@/api/shared';
import { ShopService } from '@/business/shop';
import { PRISMA_FOR_SHOP, PrismaForShop } from '@/persistance/prisma-clients';

@UseGuards(UserJwtAuthGuard)
@Resolver('Shop')
export class ShopResolver {
  constructor(
    private readonly shopService: ShopService,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  @Query('shop')
  async shop(@Args('slug') slug: string) {
    return this.shopService.findBySlug(slug);
  }

  @Query('shops')
  async shops(@Args('input') input?: ListInput) {
    const [result, total] = await Promise.all([
      this.shopService.find(input),
      this.shopService.count()
    ]);

    return new ListResponse(result, result.length, { total });
  }

  @Mutation('createShop')
  async createShop(@Args('input') input: CreateShopInput) {
    return this.shopService.create(input);
  }

  @Mutation('updateShop')
  async updateShop(@Args('shopSlug') shopSlug: string, @Args('input') input: UpdateShopInput) {
    return this.shopService.update(shopSlug, input);
  }

  @ResolveField('owner')
  async owner(@Parent() shop: Shop) {
    return this.prisma.shop.findUnique({ where: { id: shop.id } }).owner();
  }
}
