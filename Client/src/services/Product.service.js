import createHttp from "./http.service";

class ProductService {
  constructor() {
    this.http = createHttp("/api/products");
  }

  async getAllProduct() {
    return (await this.http.get("/")).data;
  }

  async getproductwithID(id) {
    return (await this.http.get(`/editBook/${id}`)).data;
  }

  async getProductLimit() {
    return (await this.http.get("/limit")).data;
  }

  async create(data) {
    return (await this.http.post("/", data)).data;
  }

  async get(id) {
    return (await this.http.get(`/find/${id}`)).data;
  }

  async getwithID(id) {
    return (await this.http.get(`/${id}`)).data;
  }

  async findproductwithName(name) {
    return (await this.http.get(`/findProduct/${name}`)).data;
  }

  async update(id, data) {
    return (await this.http.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.http.delete(`/${id}`)).data;
  }

  async updateproductafterorder(id, data) {
    return (await this.http.put(`/${id}`, data)).data;
  }


}

export default new ProductService();
