//Authentication account
const UserModel = require("../models/User");
const CryptoJS = require("crypto-js");


module.exports = class API {
  //Register Account
  static async registerAccount(req, res) {
    const userData = await UserModel.findOne({
      email: req.body.email,
    });

    if (userData) {
      res.status(401).json("Đã tồn tại tài khoản !");
    } else {
      const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SECRET
        ).toString(),
        phonenumber: req.body.phonenumber
      });

      try {
        const CreateNewUser = await newUser.save();
        res.status(201).json(CreateNewUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }

  //Login Account
  static async loginAccount(req, res) {
    try {
      const userData = await UserModel.findOne({
        email: req.body.email,
      });

      //Kiểm tra tên tài khoản
      if (!userData) {
        res.status(401).json("Sai tài khoản Email !");
      } else {
        //Mã hóa mật khẩu từ DB
        const hashedPassword = CryptoJS.AES.decrypt(
          userData.password,
          process.env.PASS_SECRET
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        //So sánh 2 mật khẩu
        if (originalPassword !== inputPassword) {
          res.status(401).json("Sai mật khẩu");
        } else {
          res.status(200).json(userData);
        }
      }
    } catch (err) {
      res.status(501).json(err);
    }
  }
};
