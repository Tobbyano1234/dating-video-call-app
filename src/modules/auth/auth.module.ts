import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './guard/jwt-strategy';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, UserModule],
  controllers: [AuthController],
})
export class AuthModule { }


