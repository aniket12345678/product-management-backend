const { add, update, findAll, deleteProduct, fetchProductImage } = require('../controllers/product.controller');
const { productModel } = require('../models/product.model');
const path = require('path');

jest.mock('../models/product.model');
jest.mock('path');

describe('Product Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        it('should add a product successfully', async () => {
            req.body = { data: JSON.stringify({ product: 'testProduct' }) };
            req.file = { filename: 'testFile.jpg' };
            productModel.create.mockResolvedValue({});

            await add(req, res, next);

            expect(productModel.create).toHaveBeenCalledWith({
                product: 'testProduct',
                attachments: 'testFile.jpg',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Product added successfully',
                code: 200,
            });
        });

        it('should handle error on adding product', async () => {
            req.body = { data: JSON.stringify({ product: 'testProduct' }) };
            req.file = { filename: 'testFile.jpg' };
            const error = new Error('Test Error');
            productModel.create.mockRejectedValue(error);

            await add(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Product add error',
                code: 500,
            });
        });
    });

    describe('update', () => {
        it('should update a product successfully', async () => {
            req.body = { data: JSON.stringify({ id: 1, product: 'updatedProduct' }) };
            req.file = { filename: 'updatedFile.jpg' };
            productModel.update.mockResolvedValue([1]);

            await update(req, res, next);

            expect(productModel.update).toHaveBeenCalledWith(
                { id: 1, product: 'updatedProduct', attachments: 'updatedFile.jpg' },
                { where: { id: 1 } }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Product updated successfully',
                code: 200,
            });
        });

        it('should handle error on updating product', async () => {
            req.body = { data: JSON.stringify({ id: 1, product: 'updatedProduct' }) };
            req.file = { filename: 'updatedFile.jpg' };
            const error = new Error('Test Error');
            productModel.update.mockRejectedValue(error);

            await update(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Product update error',
                code: 500,
            });
        });
    });

    describe('findAll', () => {
        it('should find all products successfully', async () => {
            const products = [{ id: 1, product: 'testProduct' }];
            productModel.findAll.mockResolvedValue(products);

            await findAll(req, res, next);

            expect(productModel.findAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Products fetched successfully',
                data: products,
                code: 200,
            });
        });

        it('should handle error on finding all products', async () => {
            const error = new Error('Test Error');
            productModel.findAll.mockRejectedValue(error);

            await findAll(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Product findAll error',
                code: 500,
            });
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            req.body = { id: 1 };
            productModel.destroy.mockResolvedValue(1);

            await deleteProduct(req, res, next);

            expect(productModel.destroy).toHaveBeenCalledWith({ where: { id: 1 }, force: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Product deleted successfully',
                code: 200,
            });
        });

        it('should handle error on deleting product', async () => {
            req.body = { id: 1 };
            const error = new Error('Test Error');
            productModel.destroy.mockRejectedValue(error);

            await deleteProduct(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Product delete error',
                code: 500,
            });
        });
    });

    describe('fetchProductImage', () => {
        it('should fetch product image successfully', async () => {
            req.params = { id: 1 };
            const product = { id: 1, attachments: 'testFile.jpg' };
            productModel.findByPk.mockResolvedValue(product);
            const imagePath = path.join(__dirname, '..', 'uploads', 'product', product.attachments);
            path.join.mockReturnValue(imagePath);

            await fetchProductImage(req, res, next);

            expect(productModel.findByPk).toHaveBeenCalledWith(1);
            expect(path.join).toHaveBeenCalledWith(__dirname, '..', 'uploads', 'product', 'testFile.jpg');
            expect(res.sendFile).toHaveBeenCalledWith(imagePath);
        });

        it('should handle error on fetching product image', async () => {
            req.params = { id: 1 };
            const error = new Error('Test Error');
            productModel.findByPk.mockRejectedValue(error);

            await fetchProductImage(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                message: 'Fetch product image error',
                code: 500,
            });
        });
    });
});
