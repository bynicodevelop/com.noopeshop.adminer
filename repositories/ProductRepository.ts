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

        const { media } = product.data();

        const mediaRepository = new MediaRepository();

        const medialUrl = await Promise.all(media.map(async (media) => await mediaRepository.getUrl(media)));

        return {
            id: product.id,
            ...product.data(),
            media: medialUrl,
            variantes: variantes.docs.map(doc =>
            ({
                id: doc.id,
                ...doc.data()
            }))
        }
    }

    async deleteMedia(productId: string, mediaPath: string): Promise<void> {
        logger.info("Delete media", { productId, mediaPath });

        const productDocumentSnapshot = await firestore.collection('products').doc(productId).get();

        const product = productDocumentSnapshot.data();

        const mediaRepository = new MediaRepository();

        await mediaRepository.delete(mediaPath);

        const media = product.media.filter(item => item !== mediaPath);

        await productDocumentSnapshot.ref.update({
            media
        });

        logger.info("media deleted");
    }

    async createOrUpdate(data: { uid?: string, title: string, description: string, urlSource: string, media: any[], variantes: any[] }): Promise<string> {
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

    async create(data: { title: string, description: string, urlSource: string, media: any[], variantes: any[] }): Promise<string> {
        console.log(data);
        const { title, description, urlSource, media, variantes } = data;

        const mediaRepository = new MediaRepository();

        const date = new Date();

        const pathesMediaFile = await mediaRepository.upload(media);

        const productRef = await firestore.collection('products').add({
            title,
            description,
            urlSource,
            media: pathesMediaFile,
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
        const productDocumentSnapshot = await firestore.collection('products').doc(id).get();

        const variantesQuerySnapshot = await productDocumentSnapshot.ref.collection('variantes').get()

        const { media } = productDocumentSnapshot.data();

        const mediaRepository = new MediaRepository();

        await Promise.all(media.map(async (media) => await mediaRepository.delete(media)));

        await Promise.all(variantesQuerySnapshot.docs.map(async (doc) => {
            const { media } = doc.data();

            await Promise.all(media.map(async (media) => await mediaRepository.delete(media)));

            await doc.ref.delete();
        }));

        await productDocumentSnapshot.ref.delete();
    }

    async deleteVariante(productId: string, varianteId: string): Promise<void> {
        const varianteDocumentSnapshot = await firestore
            .collection('products')
            .doc(productId)
            .collection('variantes')
            .doc(varianteId)
            .get();

        const { media } = varianteDocumentSnapshot.data();

        const mediaRepository = new MediaRepository();

        await Promise.all(media.map(async (media) => await mediaRepository.delete(media)));

        await varianteDocumentSnapshot.ref.delete();
    }
}