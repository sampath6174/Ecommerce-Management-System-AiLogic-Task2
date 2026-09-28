import app from "./app";
import dotenv from "dotenv";
import sequelize from "./Config/database";
dotenv.config();
const PORT = process.env.PORT||5000

sequelize.authenticate()
.then(()=>{
    console.log("Database connected Successfully")
}).catch((error)=>{
    console.error("Database connection failed!",error)
})
app.listen(PORT,()=>{
console.log(`Server is running on ${PORT}`)
})