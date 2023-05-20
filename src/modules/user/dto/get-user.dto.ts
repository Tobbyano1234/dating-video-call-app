import { IsNotEmpty, IsString } from "class-validator";

export class GetUserByusernameDto {
    @IsString()
    @IsNotEmpty()
    username: string
}
export class GetUserByIdDto {
    @IsString()
    @IsNotEmpty()
    id: string
}

