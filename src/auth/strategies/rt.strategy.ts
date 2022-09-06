import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'aFvbniiNIUBBF2349284FJNV',
            passReqToCallback: true
        })
    }

    validate(req: Request, payload: any) {
        const refreshtoken = req.get('authorization').replace('Bearer', '').trim()
        return {
            ...payload,
            refreshtoken
        }
    }
}

