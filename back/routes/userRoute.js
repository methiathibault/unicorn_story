const express = require('express');
const router = express.Router();
const middleware = require("../controllers/middleware")

const userController = require('../controllers/userController')

router.get('/config', middleware.authenticate, userController.createTableUnicorn);
router.post("/login",userController.login)
router.post("/register", middleware.authenticate, userController.register)



module.exports = router