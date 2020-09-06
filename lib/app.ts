import * as dotenv from "dotenv";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/Routes";
import * as mongoose from "mongoose";
import errorMiddleware from "./middleware/errorHandling"
dotenv.config();

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = process.env.DATABASE_URL;

    constructor() {
        this.app = express();

        this.mongoSetup();
        this.initMiddleware();
        this.routePrv.routes(this.app); 
        this.app.use(errorMiddleware);
    }

    private initMiddleware(): void{
        // support application/json type post data
        this.app.use(bodyParser.json()); 
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        
    }

    private mongoSetup(): void{
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useCreateIndex', true);

        mongoose.connect(this.mongoUrl).then(async () =>{
            console.log("connected to mongo:", this.mongoUrl);
        }).catch( (error) => {
            console.log("failed connecting to mongo");
            console.log(error);
        })
    }
}

export default new App().app;