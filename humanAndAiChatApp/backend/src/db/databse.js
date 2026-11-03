import mongoose from "mongoose"

export const dbConnecton = async () =>{
    try{
        const connectionToDatabase = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Database connected successfully :-" , connectionToDatabase.connection.host);

    }catch(error){
        console.error("Error occurred while connecting to the database:", error);
        process.exit(1); // Exit the process with an error code
    }
}