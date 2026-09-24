import express from "express"
import cors from 'cors'
const app = express();

app.use(cors())
app.use(express.json({}))
app.use(express.urlencoded({extended : true , limit : '15kb'}))

app.listen(3000 ,() =>{
    console.log("Server is Running on port 3000");
})