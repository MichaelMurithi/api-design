import { Request, Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middleware';

const router = Router()

/**
 * Product
 */

router.get('/product', (req, res) => {
    res.status(200);
    res.json({ message: 'Hello products' });
});
router.get('/product/:id', () => { });
router.put('/product/:id', body('name').isString(), (req, res) => {
    handleInputErrors(req as Request, res);
});
router.post('/product', () => { });
router.delete('/product/:id', () => { });

/**
 * Updates
 */

router.get('/update', () => { });
router.get('/update/:id', () => { });
router.put('/update/:id', () => { });
router.post('/update', () => { });
router.delete('/update/:id', () => { });

/**
 * Update Point
 */

router.get('/updatepoint', () => { });
router.get('/updatepoint/:id', () => { });
router.put('/updatepoint/:id', () => { });
router.post('/updatepoint', () => { });
router.delete('/updatepoint/:id', () => { });

export default router

