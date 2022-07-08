import fs from "fs";

// image upload to local server 
const imageUploader = async (image, id) => {
    return await image.mv(`./productImages/${id}.jpg`)
};

// delete image method
const deleteImage = async (id,res) => {
    fs.unlink(`./productImages/${id}.jpg`, (err) => {
        if (err){
            return res.status(500).json({
                success:false,
                error:err
            })
        } else return true
    })
};

export { imageUploader, deleteImage };