const { signup, login } = require("../controllers/authController.js");
const { signupValidation, loginValidation } = require("../middlewares/authValidation.js");

const router = require("express").Router();

router.post("/signup", signupValidation, signup);

router.post("/login", loginValidation, login);

module.exports = router;