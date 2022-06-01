import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from './routes/posts.js'
const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))


// app.use(express.json())
app.use(cors())

const CONNECTION_URL ='mongodb+srv://mehdi:chris-brown@cluster0.kwvvj.mongodb.net/?retryWrites=true&w=majority'
const PORT=process.env.PORT || 5000;
app.use('/posts',postRoutes)
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server runing on port:${PORT}`)))
.catch((err)=>console.log(err.message))

