const PublisherModel = require("../models/Publisher");

module.exports = class API {
  //Create Publisher
  static async createPublisher(req, res) {
    const publisherInput = new PublisherModel({
      publisher_name: req.body.publisher_name,
      address: req.body.address,
    });
    try {
      const createNewPublisher = await publisherInput.save();
      res.status(200).json(createNewPublisher);
      console.log(publisherInput);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Update Category
  static async updatePublisher(req, res) {
    const id_publisher = req.params.id;
    try {
      const updatePublisher = await PublisherModel.findByIdAndUpdate(
        id_publisher,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatePublisher);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Delete Category
  static async deletePublisher(req, res) {
    const id_publisher = req.params.id;
    try {
      await PublisherModel.findByIdAndDelete(id_publisher);
      res.status(200).json("Nhà xuất bản đã được xóa thành công!");
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get Category With id
  static async getpublishertwithID(req, res) {
    try {
      const result = await PublisherModel.findOne({ _id: req.params.id });
      res.status(201).json(result);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Find Category with name
  static async findpublisherwithName(req, res) {
    try {
      const name_publisher = await req.params.namepublisher;
      const PublisherData = await PublisherModel.find({
        publisher_name: { $regex: `${name_publisher}`, $options: "i" },
      });

      res.status(201).json(PublisherData);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get All Category
  static async getAllPublisher(req, res) {
    try {
      const arrayPublisher = await PublisherModel.find();
      res.status(200).json(arrayPublisher);
    } catch (err) {
      res.status(501).json(err);
    }
  }
};
