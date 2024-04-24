import createHttp from "./http.service";

class OrderService {
  constructor() {
    this.http = createHttp("/api/order");
  }

  async getAllOrder() {
    return (await this.http.get("/")).data;
  }

  async create(data) {
    return (await this.http.post("/", data)).data;
  }

  async get(id) {
    return (await this.http.get(`/${id}`)).data;
  }

  async getOrderWithID(id) {
    return (await this.http.get(`/detailorder/${id}`)).data;
  }

  async getDataOrderWithIDUser(id) {
    return (await this.http.get(`/infoUser/${id}`)).data;
  }

  async getDataOrderWithIDOrder(id) {
    return (await this.http.get(`/${id}`)).data;
  }

  async updateOrder(id, data) {
    return (await this.http.put(`/infoUser/${id}`, data)).data;
  }

  async updateOrderAdmin(id, data) {
    return (await this.http.put(`/editorder/${id}`, data)).data;
  }

  async findorderwithID(id) {
    return (await this.http.get(`/findOrder/${id}`)).data;
  }

  async getorderwithstatusorder(name) {
    return (await this.http.get(`/filterStatusOrder/${name}`)).data;
  }
}

export default new OrderService();
