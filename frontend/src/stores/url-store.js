import {defineStore} from 'pinia';
import { api } from 'src/boot/axios';
import { useUserStore } from './user-store';
import { ref } from "vue";

export const useUrlStore = defineStore('url', () => {

    const userStore = useUserStore();
    
    const links = ref([])

    const createLink = async(link) => {
        try {
            const res = await api({
                method: "POST",
                url: "/links",
                headers: {
                    Authorization: "Bearer " + userStore.token,
                },
                data: {
                    longLink: link,
                },

            });
            console.log(res.data)
            links.value.push(res.data.newLink)
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    const getLinks = async() => {
        try {
            const res = await api({
                method: "GET",
                url: "/links",
                headers: {
                    Authorization: "Bearer " + userStore.token,
                }
            });

            //links.value = res.data.links.map((item) => item)
            links.value = [...res.data.links]
        } catch (error) {
            console.log(error.response?.data || error)
        }
    };

    getLinks();

    const removeLink = async(_id) => {
        try {
            const res = await api({
                method: "DELETE",
                url: `links/${_id}`,
                headers: {
                    Authorization: "Bearer " + userStore.token,
                }
            });
            links.value= links.value.filter(item => item._id !== _id);
        } catch (error) {
            throw error.response?.data || error;
        }
    };

    const updateLink = async(newLink) => {
        try {
            const res = await api({
                method: "PATCH",
                url: `links/${newLink._id}`,
                data: {
                    longLink: newLink.longLink
                },
                headers: {
                    Authorization: "Bearer " + userStore.token,
                }
            });
            links.value= links.value.map(item => item._id === newLink._id ? newLink : item);
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    return {
        createLink,
        links,
        getLinks,
        removeLink,
        updateLink
    }
})