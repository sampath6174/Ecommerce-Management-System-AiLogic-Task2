import sequelize from "../Config/database";
import { up } from "./001_create_users";
const queryInterface = sequelize.getQueryInterface()

up(queryInterface)
.then(()=>{
    console.log("Migration successful")
}).catch((error)=>{
    console.log("migration failed",error)
}).finally(()=>{
    sequelize.close()
})