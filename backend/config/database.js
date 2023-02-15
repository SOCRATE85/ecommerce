const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {
        console.log(`Mongodb connected: ${data.connection.host}`);
    });
}

module.exports = connectDatabase;
