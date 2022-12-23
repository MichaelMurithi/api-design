import { Request, Router } from 'express';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getOne, getProducts, updateProduct } from './handlers/product';
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
router.post('/products', body('name').isString(), (req, res) => {
    handleInputErrors(req as Request, res);
    createProduct(req, res);
});
router.delete('/products/:id', deleteProduct);

/**
 * Updates
 */

router.get('/updates', () => { });
router.get('/updates/:id', () => { });
router.put('/updates/:id',
    body('title').optional(),
    body('body').optional(),
    body('version').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    () => { }
);
router.post('/updates',
    body('title').exists().isString(),
    body('body').exists().isString(),
    () => { }
);
router.delete('/updates/:id', () => { });

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

export default router

