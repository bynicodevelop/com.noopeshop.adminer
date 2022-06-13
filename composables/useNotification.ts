enum types {
    success,
    error,
    warning,
    info,
}

export const useNotification = () => {
    const timer = ref(null);
    const showNotification = useState('showNotification', () => false);
    const titleNotification = useState("titleNotification", () => "");
    const messageNotification = useState("messageNotification", () => "");

    const typeNotification = useState("typeNotification", () => types.success);

    const timeoutNotification = ref(3000);

    const success = (message: string, title: string = 'Success', timeout: number = 3000) => {
        titleNotification.value = title;
        messageNotification.value = message;

        showNotification.value = true;
        typeNotification.value = types.success;

        timeoutNotification.value = timeout;
    }

    const error = (message: string, title: string = 'Error', timeout: number = 3000) => {
        titleNotification.value = title;
        messageNotification.value = message;

        showNotification.value = true;
        typeNotification.value = types.error;

        timeoutNotification.value = timeout;
    }

    const warning = (message: string, title: string = 'Warning', timeout: number = 3000) => {
        titleNotification.value = title;
        messageNotification.value = message;

        showNotification.value = true;
        typeNotification.value = types.warning;

        timeoutNotification.value = timeout;
    }

    const info = (message: string, title: string = 'Info', timeout: number = 3000) => {
        titleNotification.value = title;
        messageNotification.value = message;

        showNotification.value = true;
        typeNotification.value = types.info;

        timeoutNotification.value = timeout;
    }

    watch(showNotification, (value) => {
        if (!value) {
            if (timer.value) {
                clearTimeout(timer.value);
            }

            titleNotification.value = "";
            messageNotification.value = "";
        } else {
            timer.value = setTimeout(() => {
                showNotification.value = false;
            }, timeoutNotification.value);
        }
    })

    return {
        showNotification,
        typeNotification,
        titleNotification,
        messageNotification,
        success,
        error,
        warning,
        info,
    }
}