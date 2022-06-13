import { firestore, storage } from '~~/utils/firebase';

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

    async create(data: { title: string, description: string, urlSource: string, media: Array<string> }) {
        const productRef = await firestore.collection('products').add(data);

        return productRef.id;
    }

    async update(id: string, data: { title: string, description: string, urlSource: string/*, media: Array<string>*/ }) {
        await firestore.collection('products').doc(id).update({
            ...data,
            updatedAt: new Date()
        });
    }

    async delete(id: string): Promise<void> {
        await firestore.collection('products').doc(id).delete();
    }
}