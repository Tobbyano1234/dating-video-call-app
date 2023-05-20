import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Call, CallSchema } from './schema/call.schema';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Call.name, schema: CallSchema }]),
    UserModule,
  ],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule { }
