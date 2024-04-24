const express = require("express");
const router = express.Router();
const API_order = require("../controllers/order.controller");

//Router
//Create Order
router.post("/", API_order.createOrder);

//Get All Order
router.get("/", API_order.getAllOrder);

//Update Order
router.put("/infoUser/:id", API_order.updateOrder);

//Update order admin
router.put("/editorder/:id", API_order.updateOrderAdmin);


//Get Data Order with ID send
router.get("/detailorder/:id", API_order.getDataOrderWithID);

//Get Data Order with ID user
router.get("/infoUser/:id", API_order.getDataOrderWithIDUser);


//Get Data Order with ID order
router.get("/:id", API_order.getDataOrderWithIDOrder);

//Find order with id
router.get("/findOrder/:id", API_order.findorderwithID);

//Get data order with status order
router.get("/filterStatusOrder/:name", API_order.getorderwithstatusorder);


module.exports = router;
