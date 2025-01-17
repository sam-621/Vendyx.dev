import { graphql } from '../codegen';

export const COMMON_USER_FRAGMENT = graphql(`
  fragment CommonUser on User {
    id
    email
    emailVerified
  }
`);

export const WHOAMI_QUERY = graphql(`
  query Whoami {
    whoami {
      ...CommonUser
    }
  }
`);

export const CREATE_USER_MUTATION = graphql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      apiErrors {
        code
        message
      }
      user {
        id
      }
    }
  }
`);

export const GENERATE_ACCESS_TOKEN_MUTATION = graphql(`
  mutation GenerateAccessToken($input: GenerateUserAccessTokenInput!) {
    generateUserAccessToken(input: $input) {
      apiErrors {
        code
        message
      }
      accessToken
    }
  }
`);

export const VALIDATE_ACCESS_TOKEN_QUERY = graphql(`
  query ValidateAccessToken {
    validateAccessToken
  }
`);

export const VALIDATE_OTP_MUTATION = graphql(`
  mutation ValidateOtp($input: ValidateOtpInput!) {
    validateOtp(input: $input) {
      apiErrors {
        code
        message
      }
      user {
        id
      }
    }
  }
`);

export const USER_HAS_SUBSCRIPTION_QUERY = graphql(`
  query UserHasSubscription {
    whoami {
      subscription {
        id
      }
    }
  }
`);
