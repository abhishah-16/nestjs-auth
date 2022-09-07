import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/shared/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {

    constructor(private authservice: AuthService) { }

    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authservice.signup(dto)
    }

    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authservice.signin(dto)
    }

    @UseGuards(AtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request) {
        const user = req.user
        return this.authservice.logout(user['sub'])
    }

    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request) {
        const user = req.user
        return this.authservice.refreshToken(user['sub'], user['refreshToken'])
    }
}
