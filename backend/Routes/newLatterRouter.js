import express from "express";
import asyncHandler from "express-async-handler";
import NewsLatter from "../Models/NewsLatter.js";



const newLatterRouter = express.Router();



newLatterRouter.post(
    "/",
    asyncHandler(async (req, res) => {
        let {email} = req.body
        
        const existemail = await NewsLatter.findOne({ email: email });
if (existemail)
{
  res.status(201).json(
    "Allready Submited"
  );
}
else
{
      const lettre = await NewsLatter.create({
       email
      });
  
      if (lettre) {
        res.status(201).json(
          "successfully submitted to newsletter"
        );
      } else {
        res.status(400);
        throw new Error("Invalid product Data");
      }
    }
    })
  );

  
  



  export default newLatterRouter;

