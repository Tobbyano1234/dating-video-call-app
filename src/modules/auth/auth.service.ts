import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByusername(username);
    if (!user) {
      throw new BadRequestException(ErrorMessages.userNotFound(username));
    }
    const validPassword = await bcrypt.compare(password, user.data["password"])
    if (!validPassword) {
      throw new UnauthorizedException(ErrorMessages.INCORRECT_CREDENTIALS);
    }
    return user.data;
  };

  async createToken(user: any) {
    const { email, userId } = user;
    const payload = { email, userId }
    return this.jwtService.sign(payload);
  }

}