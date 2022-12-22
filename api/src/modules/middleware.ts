import { Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';

export const handleInputErrors = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() })
    }
}