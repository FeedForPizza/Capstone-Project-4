import express from "express"
import axios from "axios"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path"


const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async(req,res)=>{
    try{
        const response = await axios.get("https://cat-fact.herokuapp.com/facts");
        var result = response.data;
        
        res.render("index.ejs",{data: JSON.stringify(result[Math.floor(Math.random() * result.length)].text)});
        
    }
    catch(error){
        console.log(error.response.data);
        res.status(404);
    }
});


app.listen(port, (req,res)=>{
    console.log(`Server is running on port ${port}`);
});