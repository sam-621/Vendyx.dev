import { Module } from '@nestjs/common';

import { UserService } from './user';

import { AuthModule } from '@/auth';

@Module({
  imports: [AuthModule],
  providers: [UserService]
})
export class BusinessModule {}
