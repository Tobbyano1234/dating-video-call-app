import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByusernameDto } from './dto/get-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-guard.guard';



@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/signup")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  async getUserByusername(@Body() getUserByusernameDto: GetUserByusernameDto) {
    const { username } = getUserByusernameDto;
    return await this.userService.getUserByusername(username)

  }

  @Get("/:id")
  async getUerById(@Param("id") id: string) {
    return await this.userService.getUserById(id);
  }

  @Post(':id/deduct-coins')
  async deductCoins(@Param('id') userId: string, @Body('amount') amount: number) {
    return this.userService.deductCoins(userId, amount);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
