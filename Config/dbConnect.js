const mongoose = require("mongoose")
const dbconnect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database established")
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}
dbconnect()