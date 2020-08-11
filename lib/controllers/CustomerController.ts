import { Customer, CustomerModel } from "../models/customerModel";
import {Request, Response, NextFunction} from "express";
import * as mongoose from "mongoose";
import HttpException from "../exceptions/HttpException";
import CustomerNotFoundException from "../exceptions/CustomerNotFoundException";


export class CustomerController{

    private model: CustomerModel;
    constructor(){
        this.model = new Customer().model;
        //console.log(this.model);
    }

    public createNewCustomer = (request: Request, response: Response, next : NextFunction) => {
        let newCustomer = new this.model(request.body);
        newCustomer.save()
        .then(
            savedContact => {
                console.log("saved new Customer" , savedContact);
                response.status(200).send("Customer " + savedContact.name + " saved")
            }
        ).catch( err => {
            console.log("some fail", err);
        });
    }

    public getCustomers = async (request: Request, response: Response, next: NextFunction) => {
        console.log("getCustomers called");
        this.model.find({})
        .then( customers => {
            console.log (customers);
            if(customers.length > 0){
                response.status(200).send(customers);
            }else{
                response.status(200).send("There are no Customers")
            }
        }).catch(error => {
            console.log("error" + error);
            next(new HttpException(500, "internal Error"));        
        })
    }

    public getCustomerById = async (request: Request, response: Response, next: NextFunction) => {
        const customerID = request.params["customerId"];
        this.model.findOne({customerId :customerID })
        .then(result => {
            console.log(result);
            response.status(200).send(result);
        }).catch( error => {
            next(new CustomerNotFoundException(customerID));
        });
    }

    public deleteCustomerById = async (request: Request, response: Response, next: NextFunction) => {
        const customerID = request.params["customerId"];
        console.log("deletion attempt" , customerID);
        this.model.findOneAndDelete({_id : customerID})
        .then( deletedCustomer => {
            console.log(deletedCustomer);
            if(!deletedCustomer){ //check for not found
                next(new CustomerNotFoundException(customerID));
            }else{
                response.status(200).send({message : "Customer " +deletedCustomer.name + " found and deleted"});
            }
        }).catch( error => {
            console.log("Mongoose error:" + error);
            next(new HttpException(400, "Customer ID malformed"));
        });
    }
}