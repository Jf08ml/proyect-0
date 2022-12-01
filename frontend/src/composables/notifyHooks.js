import { useQuasar } from "quasar";

export const useNotify = () => {

    const $q = useQuasar();
    const showNotify = (message, type="negative") => {
        $q.notify({
            position: 'top',
            message,
            type: type || 'positive' 
        })
    }
    return {showNotify};
};