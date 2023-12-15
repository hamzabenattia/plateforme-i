import express from "express";
import asyncHandler from "express-async-handler";
import protect, { Active } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";
import admin from "../Middleware/admin.js";
import findOneOrCreate from 'mongoose-findoneorcreate';
import { v2 as cloudinary } from 'cloudinary'
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"


const userRouter = express.Router();

userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
 
    const existuser = await User.findById(req.user._id);
    if (existuser) {
      if (req.body.avatar !=="")
      {
        const result = await cloudinary.uploader.upload(req.body.avatar, {
          folder: `avatars/${existuser.fname} ${existuser.lname}`,
          crop: "scale",
      });
      existuser.avatar = result.secure_url || existuser.avatar;
      }
      existuser.fname = req.body.fname || existuser.fname;
      existuser.lname = req.body.lname || existuser.lname;
      existuser.email = req.body.email || existuser.email;
      existuser.phonenum = req.body.phonenum || existuser.phonenum;
      existuser.socite = req.body.socite || existuser.socite;
      existuser.tva = req.body.tva || existuser.tva;
      existuser.adresse.adr = req.body.adresse.adr || existuser.adresse.adr;
      existuser.adresse.ville = req.body.adresse.ville || existuser.adresse.ville;
      existuser.adresse.zipecode = req.body.adresse.zipecode || existuser.adresse.zipecode;


      existuser.role = req.body.role || existuser.role;



      if (req.body.password) 
      {
        existuser.password = req.body.password;
      }
      
      const user = await existuser.save();
      res.json({
        user,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  
  })
);





userRouter.post(
  "/socialmedia",
  asyncHandler(async (req, res) => {
    const { email, fname,lname,avatar } = req.body;
    const user = await User.findOneOrCreate ({ email },{
      fname,
      lname,
      email,
      password : email,
      avatar,
    });


    if (user) {
      res.json({
      user,
      token : generateToken(user._id),

      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// LOGIN

userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
      user,
      token : generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid User Data");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { fname,lname, email, password,phonenum, role} = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("L'utilisateur existe déjà");
    }
        if (role==="User")
        {
    const user = await User.create({
      fname,
      lname,
      phonenum,
      email,
      password,
      role,
    });

    
    if (user) {
      res.status(201).json({
       user,
       token: generateToken(user._id),
      });
      
    } 
    else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  }
     if  (role==="Imprimerie")
      {
        const {tva,socite,adresse,} = req.body;
       
        const result = await cloudinary.uploader.upload(req.body.avatar, {
          folder: `Imprimerie/logo/${socite}`,
          crop: "scale",
      });
    
        const user = await User.create({
          fname,
          lname,
          phonenum,
          email,
          password,
          role,
          tva,
          socite,
          adresse,
          avatar:result.secure_url,
          isActive:false,
        });
      
        if (user)
       {
          res.status(201).json({
            user,
            token: generateToken(user._id),
          })
        }
          else {
            throw new Error("Error");
          }}  
  
    
  })
);

userRouter.post(
  "/password/forgot",
  asyncHandler(async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new Error("User Not Found", 404));
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;


    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Link ",
        message : ` <div className="container my-5">
        <div class="table-responsive mb-4">
                          <table style="background:#f3f3f3; width:100%;" cellpadding="0" cellspacing="0" border="0">
                            <tbody><tr>
                              <td style="padding: 50px;">
                                <table style="width: 550px;margin: 0 auto" cellpadding="0" cellspacing="0" border="0">
                                  <tbody>
                                    <tr style="border-bottom:1px dashed #ddd">
                                    </tr>
                                    <tr>
                                      <td style="padding-top: 20px;">
                                        <img style="float:left;" src="https://res.cloudinary.com/durmvqkw9/image/upload/v1647787642/logo_jkoapz.png" alt="Logo"/>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="border-radius: 10px;background: #fff;padding: 30px 60px 20px 60px;margin-top: 10px;display: block;">
                                        <p style="font-family: nunito-regular, sans-serif;font-size: 18px;font-weight: 500;font-style: normal;font-stretch: normal;line-height: 1.11;letter-spacing: normal;color: #2b80ff;"> Reset Password </p>
                                        <p style="font-family: nunito-regular, sans-serif;font-size: 14px;font-weight: 500;font-style:
                                    normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;margin-bottom: 10px;"> Hi, ${user.fname} ${" "} ${user.lname}</p>
                                        <p style="font-family: nunito-regular, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;"> Click On The link blow to reset your password.</p>
                                        <a href="${resetPasswordUrl}" style=" height: 34px;background-color: #2b80ff;border: none;color: #fff;padding: 8px 20px;border-radius: 4px;display: inline-block;margin-left: 10px;margin-bottom: 20px;">RESET PASSWORD</a>
                                        <p style="font-family: nunito-regular, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #001737;"> If you did not make this request, please contact us or ignore this message.</p>
                                        <p style="font-family: nunito-regular, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: 1.71;letter-spacing: normal;color: #bbbbbb;"> This is an automatically generated email please do not reply to this email. If you face any issues, please contact us at help@printhub.tn</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                    </td>
                                  </tr>
                                </tbody></table>
                                <table style="margin: 20px auto 10px auto;" cellpadding="0" cellspacing="0" border="0">
                                  <tbody><tr>
                                    <td style="font-family: nunito-regular, sans-serif;font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: #001737;"> Copyright © 2022 PrintHub. All rights reserved.</td>
                                  </tr>
                                  <tr>
                                
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                          </tbody></table>
                        </div>`
        
    });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new Error(error.message, 500))
    }
}));


userRouter.put(
  "/password/reset/:token",
  asyncHandler(async (req, res, next) => {
  // create hash token
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({ 
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user) {
      return next(new Error("Invalid reset password token", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.status(201).json({
    success: true,
    user,
    token: generateToken(user._id),
   });
}));




// Delete User

userRouter.delete(
  "/:id",
protect,
admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isActive=false ;
      await user.save();
      res.json({ message: "User Deactivated" });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  })
);


userRouter.put(
  "/:id",
protect,
admin,
  asyncHandler(async (req, res) => {
    const { role,isActive } = req.body;
  
  const user = await User.findById(req.params.id);
  if (user) {
    user.role = role || user.role;
    user.isActive = isActive || user.isActive;


    const updateduser = await user.save();
    res.json(updateduser);
  }
   
    else {
      res.status(404);
      throw new Error("User not Found");
    }
  })
);



// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json(
      user
      );
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE


userRouter.get(
  "/:id",
  protect,
  admin,
  Active,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  })
);


// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);



export default userRouter;
