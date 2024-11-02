import {
  CustomerFieldResolver,
  OrderFieldResolver,
  OrderLineFieldResolver,
  ProductFieldResolver,
  VariantFieldResolver
} from './resolvers';

export const COMMON_RESOLVERS = [
  OrderFieldResolver,
  OrderLineFieldResolver,
  ProductFieldResolver,
  VariantFieldResolver,
  CustomerFieldResolver
];