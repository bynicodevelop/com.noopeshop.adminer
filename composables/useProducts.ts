import _ from 'lodash';

export const useProducts = () => {
    const { params } = useRoute();

    const { success } = useNotification();

    const productId = ref("");
    const title = ref("");
    const description = ref("");
    const urlSource = ref("");
    const media = ref(null);
    const variantes = ref([]);

    const products = ref([]);

    const onLoadAll = async (): Promise<void> => {
        const { data } = await useFetch<any>(`/api/v1/products`);

        products.value = data.value.data;
    }

    const onGetProduct = async (): Promise<void> => {
        const { id } = params;

        const { data } = await useFetch<any>(`/api/v1/products/${id}`);

        const { id: uid, title: productTitle, description: productDescription, urlSource: productUrlSource, variantes: productVariante } = data.value.data

        productId.value = uid;
        title.value = productTitle;
        description.value = productDescription;
        urlSource.value = productUrlSource;
        variantes.value = productVariante;
    }

    const onCreate = async (): Promise<void> => {
        await useFetch(`/api/v1/products`, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: {
                id: productId.value,
                title: title.value,
                description: description.value,
                urlSource: urlSource.value,
                variantes: variantes.value.map(variante => (variante)),
            }
        });

        success("Product created successfully");
    }

    const onUpdated = async (): Promise<void> => {
        await useFetch(`/api/v1/products/${productId.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: {
                id: productId.value,
                title: title.value,
                description: description.value,
                urlSource: urlSource.value,
                variantes: variantes.value.map(variante => (variante)),
            }
        });

        success("Product updated successfully");
    }

    const onDelete = async (product: any): Promise<void> => {
        await useFetch(`/api/v1/products/${product.id}`, {
            method: "DELETE",
        });

        products.value = _.filter(products.value, (p) => p.id !== product.id);

        success("Product deleted successfully");
    }

    const onDeleteVariante = async (index: number) => {
        if (!_.isEmpty(variantes.value[index].id)) {
            await useFetch(`/api/v1/variantes/${variantes.value[index].id}?productId=${productId.value}`, {
                method: "DELETE",
            });
        }

        variantes.value.splice(index, 1);

        success("Variante deleted successfully");
    };

    const addVariante = () => variantes.value.push({
        type: "",
        name: "",
        price: 0,
        images: null,
    });

    return {
        title,
        description,
        urlSource,
        media,
        variantes,
        products,
        onLoadAll,
        onGetProduct,
        onCreate,
        onUpdated,
        onDelete,
        addVariante,
        onDeleteVariante,
    }
}