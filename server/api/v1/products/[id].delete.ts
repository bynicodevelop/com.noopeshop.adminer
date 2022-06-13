import yup from 'yup';
import { ProductRepository } from '~~/repositories/ProductRepository';

export default defineEventHandler(async (event) => {
    const productRepository = new ProductRepository();

    await productRepository.delete(event.context.params.id);

    return {}
})