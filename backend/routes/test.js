import express from 'express';
import ApiError from '../middleware/error-handler.js';
const testRouter = express.Router();

testRouter.get('/', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

testRouter.get('/error', (req, res, next) => {
    const error = new ApiError(400, 'This is a test error', 'TEST_ERROR', 'Details about the test error.');
    next(error);
});

testRouter.get('/unexpected-error', (req, res, next) => {
    // This will cause an unexpected error
    throw new Error('Unexpected error occurred!');
});


export default testRouter;