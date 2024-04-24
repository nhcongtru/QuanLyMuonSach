import createHttp from "./http.service";

class StoreService {
  constructor() {
    this.http = createHttp("/api/store");
  }

  async getAllStore() {
    return (await this.http.get("/admin")).data;
  }

  async create(data) {
    return (await this.http.post("/", data)).data;
  }

  async getStorewithID(id) {
    return (await this.http.get(`/${id}`)).data;
  }

  async update(id, data) {
    return (await this.http.put(`/${id}`, data)).data;
  }

  async getStoreSort() {
    return (await this.http.get("/")).data;
  }
}

export default new StoreService();
