const express = require("express");
const router = express.Router();
const API_publisher = require("../controllers/publisher.controller");

//Router
//Create Product
router.post("/", API_publisher.createPublisher);

//Update Product
router.put("/:id", API_publisher.updatePublisher);

//Delete Product
router.delete("/:id", API_publisher.deletePublisher);

//Get All author
router.get("/", API_publisher.getAllPublisher);

//Get author with ID
router.get("/editauthor/:id", API_publisher.getpublishertwithID);

//Find author with name of author
router.get("/findauthor/:nameauthor", API_publisher.findpublisherwithName);

module.exports = router;
