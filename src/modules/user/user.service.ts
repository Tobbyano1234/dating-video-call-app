import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { ErrorMessages } from 'src/common/constants';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';



@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) { }
  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const userExist = (await this.UserModel.findOne({ username }));
    if (userExist) {
      throw new BadRequestException(ErrorMessages.USER_EXIST);
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const user = (await this.UserModel.create({ username, password: hashPassword }));
    return { success: true, message: 'new user created successfully', data: user };
  }


  async getUserByusername(username: string) {
    const userExist = (await this.UserModel.findOne({ username }));
    if (!userExist) {
      throw new BadRequestException(ErrorMessages.userEmailNotFound(username))
    };
    return { success: true, message: 'user fetched successfully', data: userExist };
  }

  async getUserById(userId: string) {
    try {
      const userExist = await this.UserModel.findOne({ _id: userId });
      if (!userExist) {
        throw new BadRequestException(ErrorMessages.userNotFound(userId))
      };
      return { success: true, message: 'user fetched successfully', data: userExist };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async deductCoins(userId: string, amount: number) {
    const user = await this.getUserById(userId);
    user.data.coinBalance -= amount;
    return user.data.save();
  }

}
