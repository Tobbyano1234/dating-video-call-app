import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';


@Controller('wallet')
export class WalletController {
    constructor(private userService: UserService) { }

    @Get(':id/balance')
    async getWalletBalance(@Param('id') userId: string) {
        const user = await this.userService.getUserById(userId);
        const { data } = user;
        return { coinBalance: data.coinBalance };
    }

    @Post(':id/add-coins')
    async addCoinsToWallet(@Param('id') userId: string, @Body('amount') amount: number) {
        const user = await this.userService.getUserById(userId);
        const { data } = user;
        data.coinBalance += amount;
        return data.save();
    }
}
