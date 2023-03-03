const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const path = require("path");

const handleFileUpload = (uploads) => {
   return new Promise((resolve, reject) => {
     const dbData = [];
     uploads.forEach(async (upload) => {
       const name = await `photo_${Math.random(0, 10012)}-${Math.random(0, 2000
       )}${path.parse(upload.name).ext}`;
       dbData.push(`/blogs/${name}`);
       await upload.mv(process.env.BASE_PATH + `/blogs/${name}`, async (err) => {
        if (err) {
          reject("Something wrong");
        }
      });
   });
  resolve(dbData);
 });
};

exports.uploadImages = catchAsyncError(async (req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("No files were uploaded", 404));
    }

    const uploads = Object.values(req.files);
    const images = await handleFileUpload(uploads);
    res.status(200).json({
        success: true,
        images
    });
});