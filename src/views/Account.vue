<template>
    <div class="bg-img">
        <div class="card mx-auto">
            <user-form :user="user" @submit:user="login">
                Log In
            </user-form>
            <div class="card-footer mt-2">
                <button type="button" class="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#registerModal">
                    <i class="fa-solid fa-circle-plus"></i>
                    Register
                </button>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <user-form :user="user" @submit:user="register" modalLabels="registerModalLabel" :login=false>
                        Register
                    </user-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserForm from "@/components/UserForm.vue";
import UserService from "@/services/user.service";
import { useAuthStore } from '@/stores/store';

export default {
    components: {
        UserForm
    },

    data() {
        return {
            user: {},
            authStore: useAuthStore(),
        };
    },
    methods: {
        async login(data) {
            try {
                const response = await UserService.login(data);
                await this.authStore.logIn(response);
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.log(error);
            }
        },
        async register(data) {
            try {
                await UserService.register(data);
                this.$router.go();
            } catch (error) {
                console.log(error);
            }
        },

    }
}
</script>
<style scoped>

</style>