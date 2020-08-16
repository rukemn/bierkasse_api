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
                response.status(200).send("Customer " + savedContact.firstname+ " " + savedContact.lastname + " saved")
            }
        ).catch( err => {
            next(new HttpException());
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
            next(new HttpException());        
        })
    }

    public getCustomerById = async (request: Request, response: Response, next: NextFunction) => {
        const customerID = request.params["customerId"];
        console.log(customerID);
        this.model.findOne({_id :customerID })
        .then(customer => {
            if(!customer){
                next(new CustomerNotFoundException(customerID));
                return;
            }else{
                response.status(200).send(customer);
            }
        }).catch( error => {
            next(new HttpException());
        });
    }

    public deleteCustomerById = async (request: Request, response: Response, next: NextFunction) => {
        const customerID = request.params["customerId"];
        this.model.findOneAndDelete({_id : customerID})
        .then( deletedCustomer => {
            console.log(deletedCustomer);
            if(!deletedCustomer){ //check for not found
                next(new CustomerNotFoundException(customerID));
            }else{
                response.status(200).send({message : "Customer " +deletedCustomer.firstname +" " + deletedCustomer.lastname+ " found and deleted"});
            }
        }).catch( error => {
            next(new HttpException());
        });
    }
}