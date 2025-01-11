export const debounce = (callback: (...args) => void, delay = 250) => {
    let timeoutId: ReturnType<typeof setTimeout> | null;
    return (...args: any[]) => {
        clearTimeout(timeoutId!);
        timeoutId = setTimeout(() => {
            timeoutId = null;
            callback(...args);
        }, delay);
    };
};

export const throttle = (callback, limit = 250) => {
    let wait = false;
    return () => {
        if (!wait) {
            callback.call();
            wait = true;
            setTimeout(() => {
                wait = false;
            }, limit);
        }
    };
};
