import { ProductRepository } from "~~/repositories/ProductRepository";

export default defineEventHandler(async (event) => {
    const { varianteId } = event.context.params;
    const { productId } = useQuery(event);

    console.log(productId, varianteId);

    const productRepository = new ProductRepository();

    await productRepository.deleteVariante(productId as string, varianteId);

    return {}
})