import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService,
        private jwtservice: JwtService) { }

    // hash data
    hashData(data: any) {
        return bcrypt.hash(data, 10)
    }

    // generate and get token
    async getToken(userId: number, email: string) {
        const [at, rt] = await Promise.all([
            this.jwtservice.signAsync({
                sub: userId,
                email
            }, {
                secret: 'aFvbniiNIUBBF2349284FJNV',
                expiresIn: 60 * 15
            }),
            this.jwtservice.signAsync({
                sub: userId,
                email
            }, {
                secret: 'aFvbniiNIUBBF2349284FJNV',
                expiresIn: 60 * 60 * 24 * 7
            })
        ])

        return {
            access_token: at,
            refresh_token: rt
        }

    }

    // hash refresh token and update user data
    async updateRtHash(userId: number, refreshToken: string) {
        const hash = await this.hashData(refreshToken)
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        })
    }

    async signup(dto: AuthDto): Promise<Tokens> {
        const hash = await this.hashData(dto.password.toString())
        const newuser = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            }
        })
        const tokens = await this.getToken(newuser.id, newuser.email)
        await this.updateRtHash(newuser.id, tokens.refresh_token)
        return tokens
    }

    signin() {

    }

    logout() {

    }

    refreshToken() {

    }
}
