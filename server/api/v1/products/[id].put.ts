import _ from 'lodash';
import { ProductRepository } from '~~/repositories/ProductRepository';

export default defineEventHandler(async (event) => {
    const { id } = event.context.params;
    const { title, description, urlSource/*, media*/ } = await useBody(event);

    const productRepository = new ProductRepository();

    await productRepository.update(id, {
        title,
        description,
        urlSource,
        // media
    });


    return {}
})