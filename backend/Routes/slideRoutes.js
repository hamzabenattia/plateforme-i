import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import admin from "../Middleware/admin.js"
import Slide from "./../Models/SlideModel.js"


const slideRouter = express.Router();

slideRouter.get(
        "/",
        asyncHandler(async (req, res) => {

            const slide = await Slide.find();
            res.json({ slide});


        })
);


slideRouter.post(
    "/",  protect,admin,
    asyncHandler(async (req, res) => {
        const { image, url } = req.body;
        const slide = await Slide.create({
            image,
            url,
          });

          if (slide) {
            res.status(201).json({
              _id: slide._id,
              image: slide.image,
              url: slide.url,
            });
          } else {
            res.status(400);
            throw new Error("Invalid Slide Data");
          }
    })
);


slideRouter.delete(
  "/:id",protect,admin,
  asyncHandler(async (req, res) => {
    const slide = await Slide.findById(req.params.id);
    if (slide) {
      await slide.remove();
      res.json({ message: "Slide Image deleted" });
    } else {
      res.status(404);
      throw new Error("Slide Image not Found");
    }
  })
);



export default slideRouter;

