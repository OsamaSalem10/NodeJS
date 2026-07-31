const cloudinary = require("../config/cloudinary");
const categoryModel = require("../models/categories");
exports.getAll = (req, res) => {
  categoryModel.getCategories((err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });   
};

exports.getOne = (req, res) => {
  categoryModel.getCategory(req.params.id, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;      
 let image = "";
    let public_id = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "03_supermarket/categories",
      });

 image = result.secure_url
 public_id = result.public_id
    }
      const data = [name, image, public_id];
    categoryModel.createCategory(data, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }
        res.json({
            message: "Category created successfully"
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Internal server error",
        error: error.message
    });
};
};

exports.update = async (req, res) => {
  try {
      const id = req.params.id;
      const { name } = req.body;
  
      categoryModel.getCategory(id, async (err, data) => {
        if (err) return res.status(500).json(err);
  
        let image = data[0].image;
        let public_id = data[0].image_public_id;
  
        if (req.file) {
          if (public_id) {
            await cloudinary.uploader.destroy(public_id);
          }
  
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "03_supermarket/categories",
          });
  
          image = result.secure_url;
          public_id = result.public_id;
        }
  
        const userData = [name, image, public_id];
  
        categoryModel.updateCategory(userData, id, (err, result) => {
          if (err) return res.status(500).json(err);
  
          res.json({
            message: "Category updated",
          });
        });
      });
    } catch (err) {
      res.status(500).json(err);
    }
}
exports.delete = (req, res) => {
 const id = req.params.id;
 
   categoryModel.getCategory(id, async (err, data) => {
     if (err) return res.status(500).json(err);
 
     const public_id = data[0].image_public_id;
 
     if (public_id) {
       await cloudinary.uploader.destroy(public_id);
     }
 
     categoryModel.deleteCategory(id, (err, result) => {
       if (err) return res.status(500).json(err);
 
       res.json({
         message: "category deleted",
       });
     });
   });
};
