import createHttp from "./http.service";

class UserService {
  constructor() {
    this.http = createHttp("/api/user");
  }

  async getAllUser() {
    return (await this.http.get("/")).data;
  }

  async getuserwithID(id) {
    return (await this.http.get(`/editUser/${id}`)).data;
  }

  async create(data) {
    return (await this.http.post("/", data)).data;
  }

  async get(id) {
    return (await this.http.get(`/find/${id}`)).data;
  }

  async finduserwithName(name) {
    return (await this.http.get(`/findUser/${name}`)).data;
  }

  async update(id, data) {
    return (await this.http.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.http.delete(`/${id}`)).data;
  }

  async getuser(name) {
    return (await this.http.get(`/user/${name}`)).data;
  }

  async getuserwithid(id) {
    return (await this.http.get(`/infoUser/${id}`)).data;
  }

  async getuserwithidChangePass(id, data) {
    return (await this.http.put(`/changepassword/${id}`, data)).data;
  }
}

export default new UserService();
