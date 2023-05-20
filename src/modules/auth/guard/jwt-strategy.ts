
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/common/constants';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>("JWT_SECRET"),
        });
    }

    async validate(payload: any) {
        const user = await this.userService.getUserById(payload.userId);
        console.log("user", user)
        const { data } = user;
        console.log("user data", data)
        if (!data) throw new UnauthorizedException(ErrorMessages.USER_NOT_AUTHORIZE);
        return user.data;
    }


}