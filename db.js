const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://Cluster21897:Mongo@inotebook.r9unt.mongodb.net/notebook?retryWrites=true&w=majority&appName=iNotebook"

const connectToMongo = () => {
    mongoose.connect(MONGO_URI);
    const db = mongoose.connection;
    db.on("connected", () => {
        console.log("connected successfully");
    })
}


module.exports = connectToMongo; 