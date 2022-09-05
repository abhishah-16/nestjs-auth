import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEmail()
    @IsNotEmpty()
    password: string
}