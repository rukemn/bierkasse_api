import * as dotenv from "dotenv";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
dotenv.config();

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = process.env.DATABASE_URL;

    constructor() {

        this.app = express();
        this.config();
        this.routePrv.routes(this.app); 
        this.mongoSetup();
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useUnifiedTopology', true);

        mongoose.connect(this.mongoUrl).then(async () =>{
            console.log("connected to mongo:", this.mongoUrl);
        }).catch( (error) => {
            console.log("failed connecting to mongo");
            console.log(error);
        })
    }

}

export default new App().app;