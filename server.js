import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import conectarMdb from "./config/conexion.js";

import routerLogin from "./routes/logIn.js"

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(cookieParser());
        this.path = {
            cargo: "/api/cargo",
            login: "/login"
        }
        this.middlewares();
        this.routes()
        this.conexion();
    }
    middlewares(){
        this.app.use(cors()); 
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.path.cargo,routerCentros);
        this.app.use(this.path.login,routerLogin);
    }
    async conexion(){
        await conectarMdb()
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor en lineaa Mira ese Numerin </> ${this.port} ....`);
        })
    }
}
export default Server




