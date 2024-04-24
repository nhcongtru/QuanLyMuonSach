const express = require("express");
const router = express.Router();
const API_store = require("../controllers/store.controller");

//Router
//Get All Store
router.get("/admin", API_store.getAllStore);

//Create Product
router.post("/", API_store.createStore);

//Update Product
router.put("/:id", API_store.updateStore);

//Get Store with ID
router.get("/:id", API_store.getStorewithID);

//Get Store Sort
router.get("/", API_store.getStoreSort);



module.exports = router;
