import _ from 'lodash';
import { NotificationRepository } from '~~/repositories/NotificationRepository';

export default defineEventHandler(async (event) => {
    const { id } = event.context.params;

    const notificationRepository = new NotificationRepository();

    const notification = await notificationRepository.getById(id);

    return {
        data: notification,
    }
})