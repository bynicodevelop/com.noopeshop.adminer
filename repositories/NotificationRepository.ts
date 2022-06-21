import { firestore, logger } from '~~/utils/firebase';
import _ from 'lodash';

export class NotificationRepository {
    async getAll() {
        const notificationsQuerySnapshot = await firestore.collection('notifications').orderBy('createdAt', 'desc').get();

        return notificationsQuerySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
    }

    async getById(id: string): Promise<any> {
        const notification = await firestore.collection('notifications').doc(id).get();
        return {
            id: notification.id,
            ...notification.data(),
        }
    }

    async createNotification(data: { title: string, body: string, status: string, productId?: string }): Promise<string> {
        const { title, body, status, productId } = data;

        const notification = {
            title,
            body,
            status,
            createdAt: new Date(),
        };

        if (!_.isEmpty(productId)) {
            notification['data'] = { productId };
        }

        const docRef = await firestore.collection('notifications').add(notification);

        logger.info(`Created notification with id: ${docRef.id} `);

        return docRef.id;
    }

    async updateNotification(id: string, data: { title: string, body: string, status: string, productId?: string }): Promise<void> {
        const { title, body, status, productId } = data;

        const notification = {
            title,
            body,
            status,
            updatedAt: new Date(),
        };

        if (!_.isEmpty(productId)) {
            notification['data'] = { productId };
        }

        await firestore.collection('notifications').doc(id).update(notification);

        logger.info(`Updated notification with id: ${id} `);
    }
}