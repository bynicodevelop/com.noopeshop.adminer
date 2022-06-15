import _ from 'lodash';
import { MediaRepository } from '~~/repositories/MediaRepository';
import { firestore, logger } from '~~/utils/firebase';

export class ProductRepository {
    async getAll() {
        const products = await firestore.collection('products').get();

        return products.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
    }

    async getById(id: string): Promise<any> {
        const product = await firestore.collection('products').doc(id).get();

        const variantes = await product.ref.collection('variantes').get()

        return {
            id: product.id,
            ...product.data(),
            variantes: variantes.docs.map(doc =>
            ({
                id: doc.id,
                ...doc.data()
            }))
        }
    }

    async createOrUpdate(data: { uid?: string, title: string, description: string, urlSource: string, variantes: any[] }): Promise<string> {
        const { uid, title, description, urlSource, variantes } = data;

        if (!_.isEmpty(uid)) {
            return this.update(uid, {
                title,
                description,
                urlSource,
                variantes
            });
        }

        return this.create(data);
    }

    async create(data: { title: string, description: string, urlSource: string, variantes: any[] }): Promise<string> {
        const { title, description, urlSource, variantes } = data;

        const mediaRepository = new MediaRepository();

        const date = new Date();

        const productRef = await firestore.collection('products').add({
            title,
            description,
            urlSource,
            createdAt: date,
            updateAt: date,
        });

        for (let index = 0; index < variantes.length; index++) {
            const { type, name, price, images } = variantes[index];

            const pathesFile = await mediaRepository.upload(images);

            await firestore.collection('products').doc(productRef.id).collection('variantes').add({
                type,
                name,
                price,
                media: pathesFile,
                mediaType: "MediaTypeEnum.image",
                createdAt: date,
                updateAt: date,
            })
        }

        return productRef.id;
    }

    async update(id: string, data: { title: string, description: string, urlSource: String, variantes: any[] }) {
        const { title, description, urlSource, variantes } = data;

        logger.info("Update product", { id, title, description, urlSource, variantes });

        const mediaRepository = new MediaRepository();

        const date = new Date();

        await firestore.collection('products').doc(id).update({
            title,
            description,
            urlSource,
            updateAt: date,
        });

        for (let index = 0; index < variantes.length; index++) {
            const { id: varianteId, type, name, price, images } = variantes[index];

            logger.info("Update variante", { id: varianteId, type, name, price, images });

            let pathesFile = [];

            if (!_.isEmpty(images)) {
                pathesFile = await mediaRepository.upload(images);
            }

            const updateData = <any>{
                type,
                name,
                price,
                mediaType: "MediaTypeEnum.image",
                updateAt: date,
            }

            if (!_.isEmpty(pathesFile)) {
                updateData.media = pathesFile;
            }

            if (!_.isEmpty(varianteId)) {
                updateData.updateAt = date;

                await firestore.collection('products').doc(id).collection('variantes').doc(varianteId).update(updateData);

                continue;
            }

            updateData.createdAt = date;

            await firestore.collection('products').doc(id).collection('variantes').add(updateData);
        }

        return id;
    }

    async delete(id: string): Promise<void> {
        await firestore.collection('products').doc(id).delete();
    }

    async deleteVariante(productId: string, varianteId: string): Promise<void> {
        await firestore.collection('products').doc(productId).collection('variantes').doc(varianteId).delete();
    }
}