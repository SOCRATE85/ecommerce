const Settings = require("../models/settingsModel");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.createSetting = catchAsyncError(async (req, res, _next) => {
    const data = req.body;
    for(let key in data) {
        const item = data[key];
        if(item.value === "") {
            const settings = await Settings.find({ path: item.path});
            if(settings.length > 0) {
                settings.forEach(async element => {
                    await Settings.findByIdAndDelete(element._id);
                });
            }
        } else {
            const settings = await Settings.find({ path: item.path});
            if(settings.length > 0) {
                settings.forEach(async element => {
                    await Settings.findByIdAndUpdate(element._id, { value: item.value });
                });
            } else {
                await Settings.create(item);
            }
        }
    }

    const settings =  await Settings.find();
    res.status(201).json({
        success: true,
        settings
    });
});

exports.getAllSettings = catchAsyncError(async (_req, res, _next) => {
    const settings =  await Settings.find();
    res.status(201).json({
        success: true,
        settings
    });
});