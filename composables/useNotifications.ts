export const useNotifications = () => {
    const { params } = useRoute();
    const { success } = useNotification();

    const notificationId = ref('');
    const title = ref('');
    const body = ref('');
    const productId = ref(null);
    const status = ref(false);

    const products = ref<any>([]);
    const notifications = ref<any>([]);

    const onGetNotification = async (): Promise<any> => {
        const { id } = params;

        const { data } = await useFetch<any>(`/api/v1/notifications/${id}`);

        const { id: uid, title: notificationTitle, body: notificationBody, status: notificationStatus, data: notificationData } = data.value.data

        notificationId.value = uid;
        title.value = notificationTitle;
        body.value = notificationBody;
        status.value = notificationStatus === 'pending' ? false : true;

        if (notificationData) {
            productId.value = notificationData.productId;
        }
    }

    const onCreate = async () => {
        await useFetch(`/api/v1/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                title: title.value,
                body: body.value,
                status: !status.value ? 'pending' : 'published',
                productId: productId.value,
            }
        });

        success('Notification created');
    }

    const onUpdated = async () => {
        await useFetch(`/api/v1/notifications/${notificationId.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                id: notificationId.value,
                title: title.value,
                body: body.value,
                status: !status.value ? 'pending' : 'published',
                productId: productId.value,
            }
        });

        success('Notification updated');
    }

    const onLoadProducts = async (): Promise<void> => {
        const { data } = await useFetch<any>(`/api/v1/products`);

        products.value = data.value.data;
    }

    const onLoadNotifiations = async (): Promise<void> => {
        const { data } = await useFetch<any>(`/api/v1/notifications`);

        notifications.value = data.value.data;
    }

    return {
        title,
        body,
        productId,
        status,
        products,
        notifications,
        onGetNotification,
        onCreate,
        onUpdated,
        onLoadProducts,
        onLoadNotifiations,
    }
}