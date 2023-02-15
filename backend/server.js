const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//Handle UnCatch Exception
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncatch Exception`);
    process.exit(1);
});

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
     require("dotenv").config({path: "./config/config.env"});
}

//connecting to database
connectDatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETE
});

const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
})