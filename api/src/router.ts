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
router.post('/product', body('name').isString(), (req, res) => {
    handleInputErrors(req as Request, res);
});
router.delete('/product/:id', () => { });

/**
 * Updates
 */

router.get('/update', () => { });
router.get('/update/:id', () => { });
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('version').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    () => { }
);
router.post('/update',
    body('title').exists().isString(),
    body('body').exists().isString(),
    () => { }
);
router.delete('/update/:id', () => { });

/**
 * Update Point
 */

router.get('/updatepoint', () => { });
router.get('/updatepoint/:id', () => { });
router.put('/updatepoint/:id',
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    () => { }
);
router.post('/updatepoint',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { }
);
router.delete('/updatepoint/:id', () => { });

export default router

