import yup from 'yup';
import { MediaRepository } from '~~/repositories/MediaRepository';
import { ProductRepository } from '~~/repositories/ProductRepository';

const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    urlSource: yup.string().url().required(),
    media: yup.mixed().required(),
});

export default defineEventHandler(async (event) => {
    const { title, description, urlSource, media } = await useBody(event);

    try {
        schema.validateSync({ title, description, urlSource, media });
    } catch (error) {
        event.res.statusCode = 400;

        console.log(error);
    }

    const mediaRepository = new MediaRepository();

    const pathesFile = await mediaRepository.upload(media);

    const productRepository = new ProductRepository();

    await productRepository.create({
        title,
        description,
        urlSource,
        media: pathesFile,
    });

    return {}
})