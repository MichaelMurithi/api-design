import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async signUp(email: string, password: string) {
        // See if email is in use
        const users = await this.usersService.find(email);

        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        //Hash the users password
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        //Create a new user and save it
        return await this.usersService.create(email, result);
    }

    signin() {

    }
}
