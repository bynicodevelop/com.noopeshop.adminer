import yup from 'yup';
import _ from 'lodash';
import { ProductRepository } from '~~/repositories/ProductRepository';

const schemaProduct = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    urlSource: yup.string().url().required(),
    // variantes: yup.array().required(),
});

// const schemaVariant = yup.object().shape({
//     type: yup.string().required(),
//     name: yup.string().required(),
//     price: yup.string().required(),
//     // images: yup.array().required(),
// })

export default defineEventHandler(async (event) => {
    const { id } = event.context.params;
    const { title, description, urlSource, media, variantes } = await useBody(event);

    try {
        schemaProduct.validateSync({ title, description, urlSource });
    } catch (error) {
        event.res.statusCode = 400;

        console.log(error);

        return {}
    }

    // try {
    //     for (let index = 0; index < variantes.length; index++) {
    //         const { type, name, price } = variantes[index];

    //         await schemaVariant.validateSync({ type, name, price });
    //     }
    // } catch (error) {
    //     event.res.statusCode = 400;

    //     console.log(error);

    //     return {}
    // }

    const productRepository = new ProductRepository();

    await productRepository.createOrUpdate({
        uid: id,
        title,
        description,
        urlSource,
        media,
        variantes,
    });

    return {}
})