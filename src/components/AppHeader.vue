<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark w-100">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    Danh bạ
                    <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
        <div class="mx-auto text-white">
            {{ this.authStore.name }}
            <button class="mx-2 btn btn-sm btn-danger" @click="logout">
                <i class="fa-solid fa-trash-can"></i> LogOut
            </button>
        </div>
    </nav>
</template>
<script>
import { useAuthStore } from '@/stores/store';
import UserService from "@/services/user.service";
export default {
    data() {
        return {
            authStore: useAuthStore(),
        };
    },
    methods: {
        async logout() {
            this.$router.push({ name: 'account' });
            await UserService.logOut();
            await this.authStore.logOut();
        },
    }
}
</script>