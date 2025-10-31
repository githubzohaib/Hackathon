//Config file is for database
const mongoose =require('mongoose')

const connectionDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo DB is connected')
    }
    catch (error){
        console.log("MongoDB Connection Failed",error)
    }
};

module.exports = connectionDB;