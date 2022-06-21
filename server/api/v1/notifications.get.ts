import { NotificationRepository } from '~~/repositories/NotificationRepository';

export default defineEventHandler(async (event) => {
    const notificationRepository = new NotificationRepository();

    const notifications = await notificationRepository.getAll();

    return {
        data: notifications
    }
})