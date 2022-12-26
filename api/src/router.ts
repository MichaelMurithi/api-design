import { NextFunction, Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getOne, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { handleInputErrors } from './modules/middleware';

const router = Router()

/**
 * Product
 */

router.get('/products', getProducts);
router.get('/products/:id', getOne);
router.put('/products/:id', body('name').isString(), (req, res) => {
    handleInputErrors(req as Request, res);
    updateProduct(req, res);
});
router.post('/products', body('name').isString(), (req, res, next) => {
    handleInputErrors(req as Request, res);
    createProduct(req, res, next);
});
router.delete('/products/:id', deleteProduct);

/**
 * Updates
 */

router.get('/updates', getUpdates);
router.get('/updates/:id', getOneUpdate);
router.put('/updates/:id',
    body('title').optional(),
    body('body').optional(),
    body('version').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    updateUpdate
);
router.post('/updates',
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate
);
router.delete('/updates/:id', deleteUpdate);

/**
 * Update Point
 */

router.get('/updatepoints', () => { });
router.get('/updatepoints/:id', () => { });
router.put('/updatepoints/:id',
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    () => { }
);
router.post('/updatepoints',
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { }
);
router.delete('/updatepoints/:id', () => { });

router.use((err: any, req: any, res: Response, next: NextFunction) => {
    if (err.type === 'auth') {
        res.status(401)
            .json({ message: 'Unauthorized' });
    } else if (err.type === 'input') {
        res.status(400)
            .json({ message: 'Invalid input' });
    } else {
        res.status(500)
            .json({ message: "Server error" });
    }
});

export default router

