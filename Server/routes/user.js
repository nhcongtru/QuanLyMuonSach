const express = require("express");
const router = express.Router();
const API_user = require("../controllers/user.controller");

//Router
//Create Product
router.post("/", API_user.createUser);

//Update Product
router.put("/:id", API_user.updateUser);

//Delete Product
router.delete("/:id", API_user.deleteUser);

//Get All author
router.get("/", API_user.getAllUser);

//Get user with ID
router.get("/infoUser/:id", API_user.getUserWithID);

//Find author with name of author
router.get("/finduser/:nameuser", API_user.finduserwithName);

//Get user with id change pass
router.put("/changepassword/:id", API_user.getUserWithIDChangepass);

module.exports = router;
