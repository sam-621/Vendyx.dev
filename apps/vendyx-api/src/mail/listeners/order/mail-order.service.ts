import { Inject, Injectable } from '@nestjs/common';

import { MailClientSendInput } from '@/mail/clients/mail-client.interface';
import { SendGridClient } from '@/mail/clients/sendgrid-client';
import { MailError } from '@/mail/mail.error';
import { EmailTemplates } from '@/mail/templates';
import {
  PRISMA_FOR_SHOP,
  PrismaForShop
} from '@/persistence/prisma-clients/prisma-for-shop.provider';
import { ID } from '@/persistence/types/scalars.type';

@Injectable()
export class MailOrderService {
  constructor(
    private readonly sendGridClient: SendGridClient,
    @Inject(PRISMA_FOR_SHOP) private readonly prisma: PrismaForShop
  ) {}

  async sendOrderConfirmationEmail(orderId: ID): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        shipment: true,
        shop: true,
        lines: {
          include: {
            productVariant: {
              include: {
                asset: true,
                variantOptionValues: { include: { optionValue: true } },
                product: { include: { assets: { include: { asset: true } } } }
              }
            }
          }
        }
      }
    });

    if (!order || !order.customer) {
      throw new MailError(`Order or customer doesn't exist for order id: ${orderId}`);
    }

    const orderInput = {
      ...order,
      lines: order.lines.map(line => ({
        ...line,
        variant: {
          ...line.productVariant,
          optionValues: line.productVariant.variantOptionValues.map(vo => vo.optionValue),
          product: {
            ...line.productVariant.product,
            assets: line.productVariant.product.assets.map(asset => asset.asset)
          }
        }
      }))
    };

    const html = await EmailTemplates.OrderConfirmation({ order: orderInput, shop: order.shop });

    const mail: MailClientSendInput = {
      to: order.customer.email,
      from: { email: 'vendyxmail@gmail.com', name: order.shop.name },
      subject: 'We received your order',
      html
    };

    await this.sendGridClient.send(mail);
  }
}
