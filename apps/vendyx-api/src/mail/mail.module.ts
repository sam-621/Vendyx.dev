import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BusinessModule } from '@/business/business.module';

import { SendGridClient } from './clients/sendgrid-client';
import { MailCustomerListener } from './listeners/customer/mail-customer.listener';
import { MailCustomerService } from './listeners/customer/mail-customer.service';
import { MailOrderListener } from './listeners/order/mail-order.listener';
import { MailOrderService } from './listeners/order/mail-order.service';
import { MailUserListener } from './listeners/user/mail-user.listener';
import { MailUserService } from './listeners/user/mail-user.service';

@Module({
  imports: [ConfigModule.forRoot(), BusinessModule],
  providers: [
    SendGridClient,
    MailOrderService,
    MailCustomerService,
    MailUserService,
    MailOrderListener,
    MailCustomerListener,
    MailUserListener
  ]
})
export class MailModule {}
