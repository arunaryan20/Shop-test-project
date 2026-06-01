const express =require("express");
const env=require("./config/env");
const cors = require("cors");
const app=express();

const routes = require("./routes/routes");

app.use(express.json());
app.use(cors());


app.use("/api", routes);

app.listen(env.API_PORT,()=>{
    console.log(`Server is running on PORT ${env.API_PORT}`);
})
