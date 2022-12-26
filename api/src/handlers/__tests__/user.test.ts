import { Request, Response } from 'express';
import * as user from '../user';

describe('User handler', () => {
    it('should create a new user', async () => {
        const req = {
            body: {
                username: 'user',
                password: 'password'
            }
        } as Request;
        const res = {
            json({ token }) {
                expect(token).toBeTruthy()
            }
        } as Response

        const newuser = await user.createNewUser(req, res, () => { });
    });
});