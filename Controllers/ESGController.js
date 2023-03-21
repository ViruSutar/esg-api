const { validationResult } = require("express-validator");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: "./dev.env" });
const jwt = require("jsonwebtoken");
const Questions = require("../Models/Questions");
const Response = require("../Models/Response");
const { default: mongoose } = require("mongoose");

class ESGController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      // validators
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.errors[0].msg });
        }

      let user = await User.findOne({ email });

      if (user) {
        return res.send({ message: "User with this email exists" });
      }

      await User.create({
        name,
        email,
        password,
      });

      return res.send("User registerd successfully");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error in Registering user");
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // validators
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.errors[0].msg });
        }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).send("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }

      // generate jwt
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      return res.status(200).send({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error in logging in user");
    }
  }

  static async getQuestions(req, res) {
    try {
      let data = await Questions.find({}, { question: 1 });

      return res
        .status(200)
        .json({ data: data.length !== 0 ? data : "No questions found" });
    } catch (error) {
      console.log(error);
    }
  }

  static async saveResponses(req, res) {
    try {
      let responses = req.body;
      const userId = req.user;

       // validators
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.errors[0].msg });
        }

      responses.responses.map((obj) => {
        obj.userId = userId;
      });

      await Response.insertMany(responses.responses)

      return res.status(200).json({success:true,message:"Response saved"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Something went wrong"})
    }
  }

  static async attachDocuments(req, res) {
    try {
      let { questionId} = req.body;

      const userId = req.user
      if (!req.file) {
        return res.status(400).json({ message: "File not found" });
      }

      const filePath = req.file.path;

      await Response.updateOne({questionId,userId},{$set:{attachment:filePath}})

      return res.status(200).json({success:true})

    } catch (error) {
      console.log(error);
      return res.status(500).json({message:"Something went wrong"})

    }
  }

  static async getResponses(req,res){
    const userId = req.user;

    let data = await Response.aggregate([
      {$match:{userId:new mongoose.Types.ObjectId(userId.toString())}}
      ,
      {$lookup:{
        from:"questions",
        localField:"questionId",
        foreignField:"_id",
        as:"questions"
      }},
      {
        $project:{
          question:{$first:"$questions.question"},
          questionId:{$first:"$questions._id"},
          answers:1,
          attachment:1
        }
      }
    ])

    return res.status(200).json({success:true,data})
  }
  // static async addQuestions(req, res) {
  //   let generalQuestions = [
  //     {
  //       question: "Corporate Identify Number (CIN) of the Listed Entity",
  //     },
  //     {
  //       question: "Name of the Listed Entity",
  //     },
  //     {
  //       question: "Year of incorporation",
  //     },
  //     {
  //       question: "Registered office address",
  //     },
  //     {
  //       question: "Corporate office address",
  //     },
  //     {
  //       question: "email",
  //     },
  //     {
  //       question: "Telephone",
  //     },
  //     {
  //       question: "website",
  //     },
  //     {
  //       question: "Financial year for which reporting is being done",
  //     },
  //     {
  //       question: "Name of stock Exchange(s) where shares are listed",
  //     },
  //     {
  //       question: "Paid-up Capital",
  //     },
  //     {
  //       question:
  //         "Name and contact details (telephone,email,address) of the person who may be contacted in case of any question on the BRSR report",
  //     },
  //     {
  //       question:
  //         "Reporting boundary.Are the disclores under this report made on",
  //     },
  //     {
  //       question: "National",
  //     },
  //     {
  //       question: "International",
  //     },
  //     {
  //       question: "type of customers",
  //     },
  //     {
  //       question: "Permanent Employees(D)",
  //     },
  //     {
  //       question: "Other than Permanent Employees(E)",
  //     },
  //     {
  //       question: "Total employees(D + E)",
  //     },
  //     {
  //       question: "Permanent Workers(F)",
  //     },
  //     {
  //       question: "Other than Permanent Workers(G)",
  //     },
  //     {
  //       question: "Total workers(E + G)",
  //     },
  //     {
  //       question: "Permanent Workers",
  //     },
  //     {
  //       question: "Other than Permanent Workers",
  //     },
  //     {
  //       question: "Permanent Employees",
  //     },
  //     {
  //       question: "Other than Permanent Employees",
  //     },
  //   ];

  //   //  await Questions.insertMany(generalQuestions)

  //   return res.send("success");
  // }
}

module.exports = ESGController;
