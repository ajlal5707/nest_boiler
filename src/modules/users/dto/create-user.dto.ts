import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 10)
    user_name: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

}
