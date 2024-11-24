import { graphql } from '../codegen';

export const COMMON_SHOP_FRAGMENT = graphql(`
  fragment CommonShop on Shop {
    id
    name
    slug
    email
    phoneNumber
    shopApiKey
  }
`);

export const COMMON_LIST_SHOP_FRAGMENT = graphql(`
  fragment CommonListShop on Shop {
    id
    name
    slug
  }
`);

export const GET_SHOPS_QUERY = graphql(`
  query getShops {
    shops {
      items {
        ...CommonListShop
      }
    }
  }
`);

export const GET_SHOP_BY_SLUG_QUERY = graphql(`
  query Shop($slug: String!) {
    shop(slug: $slug) {
      ...CommonShop
    }
  }
`);

export const CREATE_SHOP_MUTATION = graphql(`
  mutation CreateShop($input: CreateShopInput!) {
    createShop(input: $input) {
      id
      slug
    }
  }
`);

export const UPDATE_SHOP_MUTATION = graphql(`
  mutation UpdateShop($shopSlug: String!, $input: UpdateShopInput!) {
    updateShop(shopSlug: $shopSlug, input: $input) {
      id
      slug
    }
  }
`);
