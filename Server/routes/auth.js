const express = require("express");
const router = express.Router();
const API_auth = require("../controllers/auth.controller");

router.post("/register", API_auth.registerAccount);

router.post("/login", API_auth.loginAccount);


module.exports = router;