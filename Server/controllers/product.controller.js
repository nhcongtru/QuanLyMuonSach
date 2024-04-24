const ProductModel = require("../models/Product");

module.exports = class API {
  //Create Product
  static async createProduct(req, res) {
    const productInput = new ProductModel({
      title: req.body.title,
      img_url: req.body.img_url,
      publisher: req.body.publisher,
      price: req.body.price,
      description: req.body.description,
    });
    try {
      const createNewProduct = await productInput.save();
      res.status(200).json(createNewProduct);
    } catch (err) {
      // console.log(err)
      res.status(501).json(err);
    }
  }

  static async getProductLimit(req, res) {
    try {
      const arrayProduct = await ProductModel.find().limit(12);
      res.status(200).json(arrayProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Update Product
  static async updateProduct(req, res) {
    const id_product = req.params.id;
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        id_product,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //update product after order
  static async updateproductafterorder(req, res) {
    const id_product = req.params.id;
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(
        id_product,
        {
          quantityonhand: req.body.quantity_update,
        },
        { new: true }
      );
      res.status(200).json(updateProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Delete Product
  static async deleteProduct(req, res) {
    const id_product = req.params.id;
    try {
      await ProductModel.findByIdAndDelete(id_product);
      res.status(200).json("Sản phẩm đã xóa thành công!");
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get One Product
  static async findoneProduct(req, res) {
    const id_product = req.params.id;
    try {
      const ProductResult = await ProductModel.findById(id_product);
      res.status(201).json(ProductResult);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get Product With Name
  static async findproductwithName(req, res) {
    try {
      const name_product = await req.params.nameproduct;
      const ProductData = await ProductModel.find({
        $or: [
          { title: { $regex: `${name_product}`, $options: "i" } },
          { description: { $regex: `${name_product}`, $options: "i" } },
        ],
      });

      res.status(201).json(ProductData);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get All Product
  static async getAllProduct(req, res) {
    try {
      const arrayProduct = await ProductModel.find();
      res.status(200).json(arrayProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get Product With id
  static async getproductwithID(req, res) {
    try {
      const result = await ProductModel.findOne({ _id: req.params.id });
      res.status(201).json(result);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get product with id
  static async getwithID(req, res) {
    try {
      const result = await ProductModel.findOne({ _id: req.params.id });
      res.status(201).json(result);
    } catch (err) {
      res.status(501).json(err);
    }
  }
};
