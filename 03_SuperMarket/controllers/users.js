const userModel = require("../models/users");
const cloudinary = require("../config/cloudinary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res) => {
  userModel.getUsers((err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

exports.getOne = (req, res) => {
  userModel.getUser(req.params.id, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;

    const hash = await bcrypt.hash(password, 10);

    let image = "";
    let public_id = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "03_supermarket/users",
      });

 image = result.secure_url
 public_id = result.public_id
    }

    const data = [name, email, hash, phone, image, public_id, location];

    userModel.createUser(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Database error",
          error: err.message,
        });
      }

      res.json({
        message: "User created successfully",
        image: image,
      });
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone, location } = req.body;

    userModel.getUserById(id, async (err, data) => {
      if (err) return res.status(500).json(err);

      let image = data[0].image;
      let public_id = data[0].image_public_id;

      if (req.file) {
        if (public_id) {
          await cloudinary.uploader.destroy(public_id);
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "03_supermarket/users",
        });

        image = result.secure_url;
        public_id = result.public_id;
      }

      const userData = [name, email, phone, location, image, public_id];

      userModel.updateUser(userData, id, (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "user updated",
        });
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.delete=(req,res)=>{

 const id=req.params.id

 userModel.getUserById(id, async(err,data)=>{

 if(err) return res.status(500).json(err)

 const public_id=data[0].image_public_id

 if(public_id){
 await cloudinary.uploader.destroy(public_id)
 }

 userModel.deleteUser(id,(err,result)=>{

 if(err) return res.status(500).json(err)

 res.json({
 message:"user deleted"
 })

 })

 })

}
exports.search = (req,res)=>{

 const keyword = req.query.q

 userModel.searchUsers(keyword,(err,data)=>{

  if(err) return res.status(500).json(err)

  res.json(data)

 })

}


exports.login = (req,res)=>{

 const {email,password} = req.body

 userModel.getUserByEmail(email, async (err,data)=>{

  if(err) return res.status(500).json(err)

  if(data.length === 0){
   return res.json({message:"User not found"})
  }

  const user = data[0]

  const match = await bcrypt.compare(password,user.password)

  if(!match){
   return res.json({message:"Wrong password"})
  }

  res.json({
   message:"Login success",
   user:user
  })

 })

}