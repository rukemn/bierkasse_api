import { Customer, CustomerModel } from "../models/customerModel";
import {Request, Response, NextFunction} from "express";
import * as mongoose from "mongoose";
import HttpException from "../exceptions/HttpException";


export class CustomerController{

    private model: CustomerModel;
    constructor(){
        this.model = new Customer().model;
        console.log(this.model);
    }
    public addNewCustomer = (req: Request, res: Response) => {
        let newCustomer = new this.model(req.body);
        newCustomer.save()
        .then(
            savedContact => {
                console.log("saved new Customer" , savedContact);
            }
        ).catch( err => console.log("some fail", err));
    }


    public getCustomers = async (req: Request, res: Response) => {
        console.log("getCustomers called");
        this.model.find({})
        .then( result => {
            console.log (result);
            res.status(200).send(result);
        }).catch(error => {
            console.log("error" + error);
            res.status(500).send({"error" : "internal"})            
        })
    }

    public getCustomerById = async (req: Request, res: Response) => {
        console.log("getCustomerById called");
        console.log(req.params)
        console.log(req.params["customerId"]);
        this.model.findOne({customerId : req.params["customerId"]})
        .then( result => {
            console.log("done finding");
            console.log(result);
            res.status(200).send(result);
        }).catch( error => {
            console.log("error, couldn't be found" + error);
            res.status(404).send({"Error" : "Couldn't find requested ressource"})
        });
        
    }

    public deleteCustomerById = async (req: Request, res: Response, next: NextFunction) => {
        console.log("deletion attempt" , req.params["customerId"])
        this.model.findOneAndDelete({_id : req.params["customerId"]}, (error: Error, result: any) =>
        {
            if(error){
                next(new HttpException(503, "Some Mongoose error occured"));
            }else if(!result){
                console.log("before");
                next(new HttpException(404, "Customer not found"));
                //res.status(404).send({"reason" : "notfound"});
                console.log("after");

            }else{
                console.log("Succesfully deleted" , result);
                next(new HttpException(200, "Succesfully deleted" + result));
            }
        })
    }
}