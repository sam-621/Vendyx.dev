import { graphql } from '../codegen';

export const COMMON_PRODUCT_FRAGMENT = graphql(`
  fragment CommonProduct on Product {
    id
    createdAt
    name
    slug
    description
    enabled
    variants {
      items {
        id
        salePrice
        sku
        stock
        comparisonPrice
        costPerUnit
        requiresShipping
        optionValues {
          id
          name
        }
      }
    }
    options {
      id
      name
      values {
        id
        name
      }
    }
    assets {
      items {
        id
        name
        source
        order
      }
    }
  }
`);

export const GET_ALL_PRODUCTS_QUERY = graphql(`
  query GetProducts($input: ProductListInput) {
    products(input: $input) {
      count
      pageInfo {
        total
      }
      items {
        id
        createdAt
        name
        slug
        enabled
        variants {
          items {
            id
            sku
            stock
            salePrice
          }
        }
        assets(input: { take: 1 }) {
          items {
            id
            source
          }
        }
      }
    }
  }
`);

export const GET_PRODUCT_BY_ID_QUERY = graphql(`
  query GetProduct($id: ID) {
    product(id: $id) {
      ...CommonProduct
    }
  }
`);

export const CREATE_PRODUCT_MUTATION = graphql(`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
    }
  }
`);

export const UPDATE_PRODUCT_MUTATION = graphql(`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
    }
  }
`);

export const REMOVE_PRODUCT_MUTATION = graphql(`
  mutation RemoveProduct($ids: [ID!]!) {
    softRemoveProduct(ids: $ids)
  }
`);