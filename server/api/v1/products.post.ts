import yup from 'yup';
import { ProductRepository } from '~~/repositories/ProductRepository';

const schemaProduct = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    urlSource: yup.string().url().required(),
    variantes: yup.array().required(),
});

const schemaVariant = yup.object().shape({
    type: yup.string().required(),
    name: yup.string().required(),
    price: yup.string().required(),
    images: yup.array().required(),
})

export default defineEventHandler(async (event) => {
    const { title, description, urlSource, variantes } = await useBody(event);

    try {
        schemaProduct.validateSync({ title, description, urlSource, variantes });
    } catch (error) {
        event.res.statusCode = 400;

        console.log(error);

        return {}
    }

    try {
        for (let index = 0; index < variantes.length; index++) {
            const { type, name, price, images } = variantes[index];

            console.log({ type, name, price, images });

            await schemaVariant.validateSync({ type, name, price, images });
        }
    } catch (error) {
        event.res.statusCode = 400;

        console.log(error);

        return {}
    }

    const productRepository = new ProductRepository();

    await productRepository.createOrUpdate({
        title,
        description,
        urlSource,
        variantes,
    });

    return {}
})