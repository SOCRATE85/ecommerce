const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true, 
    parameterLimit:50000
}));
app.use(fileUpload());

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
     require("dotenv").config({path: "backend/config/config.env"});
}

//Category Route Import
const category = require("./routes/categoryRoute");

//Product Route Imports
const product = require("./routes/productRoute");

//User Route Imports
const user = require("./routes/userRoute");

//Order Route Imports
const order = require("./routes/orderRoute");

//Payment Route Import
const payment = require("./routes/paymentRouts");

//Attribute Route Import
const attribute = require("./routes/attributeRoute");

//Attribute Set Route Import
const attributegroup = require('./routes/attributesetRoute');

//Settings Route Import
const settings = require("./routes/settingsRoute");

//Address Route Import
const address = require("./routes/addressRoute");

// manage blog category
const blogCategory = require("./routes/blogCategoryRoute");

//manage blogs
const blog = require("./routes/blogRoute");

//upload files
const upload = require("./routes/uploadRoute");

//manage slider
const slider = require("./routes/sliderRoute");

//manage banner
const banner = require("./routes/bannerRoute");

//catalog rule
const catalogrule = require('./routes/catalogruleRoute');

//cart rule
const cartrule = require('./routes/cartruleRoute');

app.use("/api/v1", [
    product, 
    user,
    order,
    payment,
    category,
    attribute,
    attributegroup,
    settings,
    address,
    blogCategory,
    blog,
    upload,
    slider,
    banner,
    catalogrule,
    cartrule
]);

app.use(express.static(path.join(__dirname, "./public")));

/*app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});*/

//Middleware for errors
app.use(errorMiddleware)

module.exports = app;
