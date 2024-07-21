import { InjectableOperation } from '../injector';

import { OrderEntity } from '@/app/persistance';

export interface PaymentHandler extends InjectableOperation {
  /**
   * @description
   * This is used to display the provider name to the administrator.
   * The name is not arbitrary, it's up to you to choose a name that makes sense for your provider.
   *
   * @example
   * ```ts
   * name: 'Stripe'
   * ```
   */
  name: string;

  /**
   * @description
   * This is used to identify the provider and should be unique. it's mainly used in admin ui but also it can be used in the storefront,
   * for example, when displaying the payment methods to the customer in the checkout page you may want to know which provider is used by every payment method,
   * so you can display the provider logo, or know which provider sdk to load, etc.
   *
   * @example
   * ```ts
   * code: 'stripe'
   * ```
   *
   * @waring this code is send to your storefront.
   */
  code: string;

  /**
   * @description
   * This method is called when the addPaymentToOrder mutation is called.
   * This method is responsible for creating payment for the given order.
   *
   * If the status returned is `created`, that means that the payment is created successfully and should be authorized by administrator,
   * this simulates when is a bank transfer, you create the payment but the money is not yet in your account.
   *
   * If the status returned is `authorized`, that means that the payment is authorized and the money is in your account
   * and the order marked as paid
   *
   * If the status returned is `declined`, that means that the payment has been declined and the order state keeps the same.
   */
  createPayment(
    order: OrderEntity,
    totalAmount: number,
    metadata?: Record<string, any>
  ): Promise<CreatePaymentResult>;

  /**
   * @description
   * This method is called when the authorizePayment mutation is called.
   * This method is responsible for authorizing the payment. It should be implemented when your payment process transfers the money at some other later point.
   * For example, providing a bank transfer option, or payment on delivery, where the payment is authorized but not yet transferred.
   *
   * If {@link AuthorizePaymentResult.success} is true, that means that the payment is authorized and the money is in your account and the order is marked as paid
   * If {@link AuthorizePaymentResult.success} is false, that means that something went wrong and the order state keeps the same
   */
  authorizePayment(order: OrderEntity): Promise<AuthorizePaymentResult>;
}

export type CreatePaymentResult =
  | {
      amount: number;
      status: 'created';
    }
  | {
      transactionId: string;
      amount: number;
      status: 'authorized';
    }
  | {
      status: 'declined';
      error: string;
    };

export type AuthorizePaymentResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export enum PaymentStatus {
  CREATED,
  AUTHORIZED,
  DECLINED
}