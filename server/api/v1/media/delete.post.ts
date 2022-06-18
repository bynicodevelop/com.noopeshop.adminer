import { ProductRepository } from "~~/repositories/ProductRepository";

export default defineEventHandler(async (event) => {
    const { productId, url } = await useBody(event);

    console.log(productId, url);

    const regex = /\/(products\/medias\/(.*))\?/

    const match = regex.exec(url);

    const productRepository = new ProductRepository();

    await productRepository.deleteMedia(productId, match[1]);

    return {}
})