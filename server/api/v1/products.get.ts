import { ProductRepository } from '~~/repositories/ProductRepository';

export default defineEventHandler(async (event) => {
    const productRepository = new ProductRepository();

    const products = await productRepository.getAll();

    return {
        data: products
    }
})