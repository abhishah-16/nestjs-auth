import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) { }

    signup(dto: AuthDto) {
        // const newuser = this.prisma.user.create({
        //     data:{
        //         email: dto.email,

        //     }
        // })
    }

    signin() {

    }

    logout() {

    }

    refreshToken() {

    }
}
