import createHttp from "./http.service";

class AuthService {
    constructor() {
        this.http = createHttp("/api/auth");
    }

    async createregister(data) {
        return (await this.http.post("/register", data)).data;
    }

    async createlogin(data) {
        return (await this.http.post("/login", data)).data;
    }
}

export default new AuthService();