const mongoose = require("mongoose")
require('dotenv').config();
mongoose.set("strictQuery", false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://keshav:CKuLATrWzjbWYPcp@cluster0-shard-00-00.atbc2.mongodb.net:27017,cluster0-shard-00-01.atbc2.mongodb.net:27017,cluster0-shard-00-02.atbc2.mongodb.net:27017/?ssl=true&replicaSet=atlas-12o3yn-shard-0&authSource=admin&retryWrites=true&w=majority",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`database connected! ${conn.connection.host}`)
    }catch(err){
        console.log(`not connected ${err}`)
    }
};


module.exports = connectDB;
