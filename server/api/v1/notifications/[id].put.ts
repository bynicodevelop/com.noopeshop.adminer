import yup from 'yup';
import _ from 'lodash';
import { NotificationRepository } from '~~/repositories/NotificationRepository';


export default defineEventHandler(async (event) => {
    const { id, title, body, status, productId } = await useBody(event);


    const productRepository = new NotificationRepository();

    await productRepository.updateNotification(id, {
        title,
        body,
        status,
        productId
    });

    return {}
})