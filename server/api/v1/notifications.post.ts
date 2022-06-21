import { NotificationRepository } from '~~/repositories/NotificationRepository';

export default defineEventHandler(async (event): Promise<any> => {
    const { title, body, status, productId } = await useBody(event);

    const notificationRepository = new NotificationRepository();

    const notificationId = await notificationRepository.createNotification({ title, body, status, productId });

    return {
        notificationId
    }
})