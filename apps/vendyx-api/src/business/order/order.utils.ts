import { OrderState } from '@prisma/client';

export const ValidOrderTransitions = [
  /**
   * The payment has been added but the founds have not been transferred yet
   */
  [OrderState.MODIFYING, OrderState.PAYMENT_ADDED],
  /**
   * The payment has been authorized in one step and the founds have been transferred
   */
  [OrderState.MODIFYING, OrderState.PAYMENT_AUTHORIZED],
  /**
   * The payment has been authorized and the founds have been transferred
   */
  [OrderState.PAYMENT_ADDED, OrderState.PAYMENT_AUTHORIZED],
  /**
   * The order has been shipped
   */
  [OrderState.PAYMENT_AUTHORIZED, OrderState.SHIPPED],
  /**
   * The order has been delivered
   */
  [OrderState.SHIPPED, OrderState.DELIVERED]
];

/**
 * Parse order code to get the raw order code
 *
 * @example
 * const orderCode = '#0001'
 * const rawOrderCode = parseOrderCode(orderCode)
 * console.log(rawOrderCode) // 1
 */
export const parseOrderCode = (code: string) => {
  // if 0, or is NaN, return undefined, useful for filters, if there is not valid code, don't filter by it
  return Number(code.replace('#', '')) || undefined;
};

export const formatOrderCode = (code: number) => {
  return `#${code.toString().padStart(4, '0')}`;
};
