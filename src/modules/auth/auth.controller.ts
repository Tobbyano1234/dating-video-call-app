import { Body, Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() data: any): Promise<any> {
    const user = await this.authService.validateUser(data.username, data.password)
    if (!user) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.createToken(user);
    return {
      success: true,
      message: "login successfully",
      token,
      data: user,
    };
  }


}
