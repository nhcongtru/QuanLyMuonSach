const UserModel = require("../models/User");
const CryptoJS = require("crypto-js");

module.exports = class API {
  
  static async createUser(req, res) {
    const userInput = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phonenumber: req.body.phonenumber,
    });
    try {
      const createNewUser = await userInput.save();
      res.status(200).json(createNewUser);
    } catch (err) {
      console.log(err);
      res.status(501).json(err);
    }
  }

  //Update Category
  static async updateUser(req, res) {
    const id_user = req.params.id;
    try {
      const updateUser = await UserModel.findByIdAndUpdate(
        id_user,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Delete Category
  static async deleteUser(req, res) {
    const id_user = req.params.id;
    try {
      await UserModel.findByIdAndDelete(id_user);
      res.status(200).json("Tài khoản xóa thành công!");
    } catch (err) {
      res.status(501).json(err);
    }
  }



  //Find Category with name
  static async finduserwithName(req, res) {
    try {
      const name_user = await req.params.nameuser;
      const UserData = await UserModel.find({
        username: { $regex: `${name_user}`, $options: "i" },
      });

      res.status(201).json(UserData);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get All Category
  static async getAllUser(req, res) {
    try {
      const arrayUser = await UserModel.find();
      res.status(200).json(arrayUser);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get User with ID
  static async getUserWithID(req, res) {
    const id = req.params.id;
    try {
      const data = await UserModel.findById(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(501).json(err);
    }
  }

  //Get user with id change pass
  //Get User with ID
  static async getUserWithIDChangepass(req, res) {
    const id = req.params.id;
    try {
      const data = await UserModel.findById(id);

      //Mã hóa mật khẩu từ DB
      const hashedPassword = CryptoJS.AES.decrypt(
        data.password,
        process.env.PASS_SECRET
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.old_password;

      //So sánh 2 mật khẩu
      if (originalPassword !== inputPassword) {
        res.status(401).json("Sai mật khẩu");
      } else {
        //Đúng mật khẩu
        const updateUser = await UserModel.findByIdAndUpdate(
          id,
          {
            password: CryptoJS.AES.encrypt(
              req.body.new_password,
              process.env.PASS_SECRET
            ).toString(),
          },
          { new: true }
        );
        res.status(200).json(updateUser);
      }
    } catch (err) {
      console.log(err)
      res.status(501).json(err);
    }
  }
};
