import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";


//MongoDB Connection
db.on("error", console.log.bind(console, "Erro de conexão!"));
db.once("open", () => { console.log("MongoDB Connected!"); });



//APP config
const app = express();
app.use(express.json());
routes(app);


//Middlewares
app.use(manipulador404);

app.use(manipuladorDeErros);




export default app;



