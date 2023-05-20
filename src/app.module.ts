import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './common/enums/environment-validations.enum';
import { MongoDbProviderModule } from './common/providers/database/mongodb/mongodb.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WalletController } from './modules/wallet/wallet.controller';
import { CallModule } from './modules/call/call.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    validate: validateEnv,
  }), MongoDbProviderModule, UserModule, AuthModule, CallModule],
  controllers: [AppController, WalletController],
  providers: [AppService],
})
export class AppModule { }
