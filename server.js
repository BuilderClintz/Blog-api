const express = require("express")
const app = express()


require("dotenv").config()
require("./Config/dbConnect")


const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`server is running on ${PORT}`))





// const PORT = process.env.PORT||9000

// app.listen(PORT,console.log(`server is running on ${PORT} on iremide laptop and Mr. Tunder is the tutor`))