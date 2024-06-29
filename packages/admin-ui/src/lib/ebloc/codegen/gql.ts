/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      authToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.AuthenticateDocument,
    "\n  mutation CreateOption($createOptionInput: CreateOptionInput!) {\n    createOption(input: $createOptionInput) {\n      apiErrors {\n        code\n        message\n      }\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n": types.CreateOptionDocument,
    "\n  mutation RemoveOption($id: ID!) {\n    removeOption(id: $id) {\n      success\n    }\n  }\n": types.RemoveOptionDocument,
    "\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.UpdateOptionDocument,
    "\n  mutation AddOptionValues($optionId: ID!, $values: [String!]!) {\n    addOptionValues(optionId: $optionId, values: $values) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n": types.AddOptionValuesDocument,
    "\n  mutation RemoveOptionValues($ids: [ID!]!) {\n    removeOptionValues(ids: $ids) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n": types.RemoveOptionValuesDocument,
    "\n  mutation UpdateOptionValues($input: [UpdateOptionValueInput!]!) {\n    updateOptionValues(input: $input) {\n      success\n    }\n  }\n": types.UpdateOptionValuesDocument,
    "\n  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput!) {\n    markOrderAsShipped(id: $id, input: $input) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.MarkOrderAsShippedDocument,
    "\n  mutation MarkOrderAsDelivered($id: ID!) {\n    markOrderAsDelivered(id: $id) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n": types.MarkOrderAsDeliveredDocument,
    "\n  mutation CreateProduct($createProductInput: CreateProductInput!) {\n    createProduct(input: $createProductInput) {\n      apiErrors {\n        message\n        code\n      }\n      product {\n        id\n      }\n    }\n  }\n": types.CreateProductDocument,
    "\n  mutation RemoveProduct($productId: ID!) {\n    removeProduct(id: $productId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemoveProductDocument,
    "\n  mutation UpdateProduct($productId: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $productId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      product {\n        id\n      }\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation CreateVariant($createVariantProductId: ID!, $createVariantInput: CreateVariantInput!) {\n    createVariant(productId: $createVariantProductId, input: $createVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n      }\n    }\n  }\n": types.CreateVariantDocument,
    "\n  mutation RemoveVariant($removeVariantId: ID!) {\n    removeVariant(id: $removeVariantId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n": types.RemoveVariantDocument,
    "\n  mutation UpdateVariant($updateVariantId: ID!, $updateVariantInput: UpdateVariantInput!) {\n    updateVariant(id: $updateVariantId, input: $updateVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n        price\n        stock\n        sku\n      }\n    }\n  }\n": types.UpdateVariantDocument,
    "\n  query ValidateToken {\n    validateToken\n  }\n": types.ValidateTokenDocument,
    "\n  fragment CommonCustomer on Customer {\n    id\n    createdAt\n    firstName\n    lastName\n    email\n    phoneNumber\n    phoneCountryCode\n    enabled\n    orders {\n      count\n      items {\n        id\n        code\n        placedAt\n        state\n        total\n        shipment {\n          method {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.CommonCustomerFragmentDoc,
    "\n  query GetCustomers {\n    customers {\n      count\n      items {\n        id\n        firstName\n        lastName\n        email\n        enabled\n        orders {\n          count\n          items {\n            total\n          }\n        }\n      }\n    }\n  }\n": types.GetCustomersDocument,
    "\n  query GetCustomerDetails($id: ID!) {\n    customer(id: $id) {\n      ...CommonCustomer\n    }\n  }\n": types.GetCustomerDetailsDocument,
    "\n  fragment CommonOrder on Order {\n    id\n    code\n    createdAt\n    subtotal\n    total\n    totalQuantity\n    state\n    lines {\n      items {\n        id\n        linePrice\n        quantity\n        unitPrice\n        productVariant {\n          id\n          sku\n          optionValues(withDeleted: true) {\n            id\n            value\n          }\n          product {\n            name\n            slug\n            assets {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n    customer {\n      id\n      firstName\n      lastName\n      email\n      phoneNumber\n      phoneCountryCode\n    }\n    shippingAddress {\n      streetLine1\n      streetLine2\n      postalCode\n      city\n      province\n      country\n      phoneCountryCode\n      phoneNumber\n    }\n    payment {\n      id\n      amount\n      transactionId\n      method {\n        id\n        name\n        description\n        enabled\n      }\n    }\n    shipment {\n      id\n      amount\n      trackingCode\n      carrier\n      method {\n        id\n        name\n      }\n    }\n  }\n": types.CommonOrderFragmentDoc,
    "\n  query GetOrdersQuery {\n    orders {\n      count\n      items {\n        id\n        code\n        state\n        total\n        totalQuantity\n        placedAt\n        customer {\n          id\n          firstName\n          lastName\n        }\n        shipment {\n          id\n          amount\n          trackingCode\n          method {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.GetOrdersQueryDocument,
    "\n  query GetOrderDetails($orderId: ID) {\n    order(id: $orderId) {\n      ...CommonOrder\n    }\n  }\n": types.GetOrderDetailsDocument,
    "\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    onlineOnly\n    published\n    options {\n      id\n      name\n      values {\n        id\n        value\n      }\n    }\n    variants {\n      items {\n        id\n        price\n        sku\n        stock\n        published\n        optionValues {\n          id\n          value\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n": types.CommonProductFragmentDoc,
    "\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        name\n        slug\n        onlineOnly\n        published\n        variants {\n          items {\n            id\n            sku\n            stock\n            price\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetProductDetails($slug: String!) {\n    product(slug: $slug) {\n      ...CommonProduct\n    }\n  }\n": types.GetProductDetailsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      authToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Authenticate($input: AuthenticateInput!) {\n    authenticate(input: $input) {\n      authToken\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOption($createOptionInput: CreateOptionInput!) {\n    createOption(input: $createOptionInput) {\n      apiErrors {\n        code\n        message\n      }\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOption($createOptionInput: CreateOptionInput!) {\n    createOption(input: $createOptionInput) {\n      apiErrors {\n        code\n        message\n      }\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOption($id: ID!) {\n    removeOption(id: $id) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveOption($id: ID!) {\n    removeOption(id: $id) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOption($id: ID!, $input: UpdateOptionInput!) {\n    updateOption(id: $id, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddOptionValues($optionId: ID!, $values: [String!]!) {\n    addOptionValues(optionId: $optionId, values: $values) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddOptionValues($optionId: ID!, $values: [String!]!) {\n    addOptionValues(optionId: $optionId, values: $values) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOptionValues($ids: [ID!]!) {\n    removeOptionValues(ids: $ids) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveOptionValues($ids: [ID!]!) {\n    removeOptionValues(ids: $ids) {\n      option {\n        id\n        name\n        values {\n          id\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOptionValues($input: [UpdateOptionValueInput!]!) {\n    updateOptionValues(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOptionValues($input: [UpdateOptionValueInput!]!) {\n    updateOptionValues(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput!) {\n    markOrderAsShipped(id: $id, input: $input) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation MarkOrderAsShipped($id: ID!, $input: MarkOrderAsShippedInput!) {\n    markOrderAsShipped(id: $id, input: $input) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkOrderAsDelivered($id: ID!) {\n    markOrderAsDelivered(id: $id) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation MarkOrderAsDelivered($id: ID!) {\n    markOrderAsDelivered(id: $id) {\n      order {\n        ...CommonOrder\n      }\n      apiErrors {\n        code\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($createProductInput: CreateProductInput!) {\n    createProduct(input: $createProductInput) {\n      apiErrors {\n        message\n        code\n      }\n      product {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProduct($createProductInput: CreateProductInput!) {\n    createProduct(input: $createProductInput) {\n      apiErrors {\n        message\n        code\n      }\n      product {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveProduct($productId: ID!) {\n    removeProduct(id: $productId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveProduct($productId: ID!) {\n    removeProduct(id: $productId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct($productId: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $productId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      product {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProduct($productId: ID!, $input: UpdateProductInput!) {\n    updateProduct(id: $productId, input: $input) {\n      apiErrors {\n        code\n        message\n      }\n      product {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateVariant($createVariantProductId: ID!, $createVariantInput: CreateVariantInput!) {\n    createVariant(productId: $createVariantProductId, input: $createVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateVariant($createVariantProductId: ID!, $createVariantInput: CreateVariantInput!) {\n    createVariant(productId: $createVariantProductId, input: $createVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveVariant($removeVariantId: ID!) {\n    removeVariant(id: $removeVariantId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveVariant($removeVariantId: ID!) {\n    removeVariant(id: $removeVariantId) {\n      apiErrors {\n        code\n        message\n      }\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateVariant($updateVariantId: ID!, $updateVariantInput: UpdateVariantInput!) {\n    updateVariant(id: $updateVariantId, input: $updateVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n        price\n        stock\n        sku\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateVariant($updateVariantId: ID!, $updateVariantInput: UpdateVariantInput!) {\n    updateVariant(id: $updateVariantId, input: $updateVariantInput) {\n      apiErrors {\n        message\n        code\n      }\n      variant {\n        id\n        price\n        stock\n        sku\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ValidateToken {\n    validateToken\n  }\n"): (typeof documents)["\n  query ValidateToken {\n    validateToken\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonCustomer on Customer {\n    id\n    createdAt\n    firstName\n    lastName\n    email\n    phoneNumber\n    phoneCountryCode\n    enabled\n    orders {\n      count\n      items {\n        id\n        code\n        placedAt\n        state\n        total\n        shipment {\n          method {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CommonCustomer on Customer {\n    id\n    createdAt\n    firstName\n    lastName\n    email\n    phoneNumber\n    phoneCountryCode\n    enabled\n    orders {\n      count\n      items {\n        id\n        code\n        placedAt\n        state\n        total\n        shipment {\n          method {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCustomers {\n    customers {\n      count\n      items {\n        id\n        firstName\n        lastName\n        email\n        enabled\n        orders {\n          count\n          items {\n            total\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCustomers {\n    customers {\n      count\n      items {\n        id\n        firstName\n        lastName\n        email\n        enabled\n        orders {\n          count\n          items {\n            total\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCustomerDetails($id: ID!) {\n    customer(id: $id) {\n      ...CommonCustomer\n    }\n  }\n"): (typeof documents)["\n  query GetCustomerDetails($id: ID!) {\n    customer(id: $id) {\n      ...CommonCustomer\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonOrder on Order {\n    id\n    code\n    createdAt\n    subtotal\n    total\n    totalQuantity\n    state\n    lines {\n      items {\n        id\n        linePrice\n        quantity\n        unitPrice\n        productVariant {\n          id\n          sku\n          optionValues(withDeleted: true) {\n            id\n            value\n          }\n          product {\n            name\n            slug\n            assets {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n    customer {\n      id\n      firstName\n      lastName\n      email\n      phoneNumber\n      phoneCountryCode\n    }\n    shippingAddress {\n      streetLine1\n      streetLine2\n      postalCode\n      city\n      province\n      country\n      phoneCountryCode\n      phoneNumber\n    }\n    payment {\n      id\n      amount\n      transactionId\n      method {\n        id\n        name\n        description\n        enabled\n      }\n    }\n    shipment {\n      id\n      amount\n      trackingCode\n      carrier\n      method {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CommonOrder on Order {\n    id\n    code\n    createdAt\n    subtotal\n    total\n    totalQuantity\n    state\n    lines {\n      items {\n        id\n        linePrice\n        quantity\n        unitPrice\n        productVariant {\n          id\n          sku\n          optionValues(withDeleted: true) {\n            id\n            value\n          }\n          product {\n            name\n            slug\n            assets {\n              items {\n                id\n                source\n              }\n            }\n          }\n        }\n      }\n    }\n    customer {\n      id\n      firstName\n      lastName\n      email\n      phoneNumber\n      phoneCountryCode\n    }\n    shippingAddress {\n      streetLine1\n      streetLine2\n      postalCode\n      city\n      province\n      country\n      phoneCountryCode\n      phoneNumber\n    }\n    payment {\n      id\n      amount\n      transactionId\n      method {\n        id\n        name\n        description\n        enabled\n      }\n    }\n    shipment {\n      id\n      amount\n      trackingCode\n      carrier\n      method {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrdersQuery {\n    orders {\n      count\n      items {\n        id\n        code\n        state\n        total\n        totalQuantity\n        placedAt\n        customer {\n          id\n          firstName\n          lastName\n        }\n        shipment {\n          id\n          amount\n          trackingCode\n          method {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOrdersQuery {\n    orders {\n      count\n      items {\n        id\n        code\n        state\n        total\n        totalQuantity\n        placedAt\n        customer {\n          id\n          firstName\n          lastName\n        }\n        shipment {\n          id\n          amount\n          trackingCode\n          method {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrderDetails($orderId: ID) {\n    order(id: $orderId) {\n      ...CommonOrder\n    }\n  }\n"): (typeof documents)["\n  query GetOrderDetails($orderId: ID) {\n    order(id: $orderId) {\n      ...CommonOrder\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    onlineOnly\n    published\n    options {\n      id\n      name\n      values {\n        id\n        value\n      }\n    }\n    variants {\n      items {\n        id\n        price\n        sku\n        stock\n        published\n        optionValues {\n          id\n          value\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CommonProduct on Product {\n    id\n    createdAt\n    name\n    slug\n    description\n    onlineOnly\n    published\n    options {\n      id\n      name\n      values {\n        id\n        value\n      }\n    }\n    variants {\n      items {\n        id\n        price\n        sku\n        stock\n        published\n        optionValues {\n          id\n          value\n        }\n      }\n    }\n    assets {\n      items {\n        id\n        name\n        source\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        name\n        slug\n        onlineOnly\n        published\n        variants {\n          items {\n            id\n            sku\n            stock\n            price\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProducts($input: ListInput) {\n    products(input: $input) {\n      count\n      items {\n        id\n        createdAt\n        name\n        slug\n        onlineOnly\n        published\n        variants {\n          items {\n            id\n            sku\n            stock\n            price\n          }\n        }\n        assets(input: { take: 1 }) {\n          items {\n            id\n            source\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProductDetails($slug: String!) {\n    product(slug: $slug) {\n      ...CommonProduct\n    }\n  }\n"): (typeof documents)["\n  query GetProductDetails($slug: String!) {\n    product(slug: $slug) {\n      ...CommonProduct\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;