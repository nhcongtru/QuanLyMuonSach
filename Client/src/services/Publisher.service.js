import createHttp from "./http.service";

class PublisherService {
  constructor() {
    this.http = createHttp("/api/publisher");
  }

  async getAllPublisher() {
    return (await this.http.get("/")).data;
  }

  async getpublisherwithID(id) {
    return (await this.http.get(`/editPublisher/${id}`)).data;
  }

  async create(data) {
    return (await this.http.post("/", data)).data;
  }

  async get(id) {
    return (await this.http.get(`/find/${id}`)).data;
  }

  async findpublisherwithName(name) {
    return (await this.http.get(`/findPublisher/${name}`)).data;
  }

  async update(id, data) {
    return (await this.http.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.http.delete(`/${id}`)).data;
  }

  async getpublisher(name) {
    return (await this.http.get(`/publisherBook/${name}`)).data;
  }
}

export default new PublisherService();
