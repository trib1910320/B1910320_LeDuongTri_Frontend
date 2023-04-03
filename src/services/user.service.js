import createApiClient from "./api.service";
import { useAuthStore } from '@/stores/store';

class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
        // console.log(this.api);
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async register(data) {
        return (await this.api.post("/register", data)).data;
    }
    async logOut(id) {
        return await this.api.post((`/logout${id}`)).data;
    }
}

export default new UserService();