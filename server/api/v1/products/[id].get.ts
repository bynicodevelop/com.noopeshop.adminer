import _ from 'lodash';
import { ProductRepository } from '~~/repositories/ProductRepository';

export default defineEventHandler(async (event) => {
    const { id } = event.context.params;

    const productRepository = new ProductRepository();

    const product = await productRepository.getById(id);

    return {
        data: product,
    }
})