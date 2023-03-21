const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getQuestions,
  saveResponses,
  getResponses,
  attachDocuments,
} = require("../Controllers/ESGController");
const { body, check } = require("express-validator");
const { checkAutheticated } = require("../Middlewares/Auth");
const {handleError,upload }  =require('../Config/multer')

router.post(
  "/attachDocument",
  checkAutheticated,
  upload.single("file"),
  handleError,
  attachDocuments
);

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 5 }).withMessage("Invalid password"),
    check("name").isString(),
  ],
  register
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 5 }).withMessage("Invalid password"),
  ],
  login
);

router.get("/getQuestions", getQuestions);
router.get("/getResponses", checkAutheticated, getResponses);

router.post("/saveResponse",[
  check('responses').isArray({min:26,max:26}).withMessage('Invalid response'),
  check('responses.*.questionId').isString().isLength({ min: 24 }).withMessage("Invalid questionId"),
  check('responses.*.question').isString().withMessage('question must be a string'),
  check('responses.*.answers').isArray().withMessage('answers must be an array'),
] ,checkAutheticated, saveResponses);
module.exports = router;
