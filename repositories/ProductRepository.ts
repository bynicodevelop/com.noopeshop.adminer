import _ from 'lodash';
import { MediaRepository } from '~~/repositories/MediaRepository';
import { firestore } from '~~/utils/firebase';

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

        return {
            id: product.id,
            ...product.data()
        }
    }

    // async createOrUpdate(data: { uid?: string, title: string, description: string, urlSource: string }): Promise<string> {
    //     const { uid, title, description, urlSource } = data;

    //     if (!_.isEmpty(uid)) {
    //         await this.update(uid, { title, description, urlSource });

    //         return uid;
    //     }

    //     return this.create({ title, description, urlSource });
    // }

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

    async update(id: string, data: { title: string, description: string, urlSource: String }) {
        await firestore.collection('products').doc(id).update({
            ...data,
            updatedAt: new Date()
        });
    }

    async delete(id: string): Promise<void> {
        await firestore.collection('products').doc(id).delete();
    }
}