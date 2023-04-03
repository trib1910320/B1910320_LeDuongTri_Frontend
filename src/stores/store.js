import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userid: null,
        name: null,
        login: false,
    }),

    actions: {
        logIn(data) {
            this.userid = data._id;
            this.name = data.name;
            this.login = true;
        },
        logOut() {
            this.userid = null;
            this.name = null;
            this.login = false;
        }
    },
    persist: true,
});