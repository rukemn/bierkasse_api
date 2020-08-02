import { Customer, CustomerModel } from "../models/customerModel";
import {Request, Response} from "express";
import { Error } from "mongoose";

export class CustomerController{

    private model: CustomerModel;
    constructor(){
        this.model = new Customer().model;
        console.log(this.model);
        
    }
    public addNewCustomer = (req: Request, res: Response) => {
        console.log(req.body);
        let newCustomer = new this.model({ 
            name : req.body["name"],
            email : req.body["email"],
            current_bill : req.body["bill"]
    });
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
        })
        
    }
}