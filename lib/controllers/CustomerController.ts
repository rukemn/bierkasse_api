import { Customer, CustomerModel, ICustomer } from "../models/customerModel";
import { Response, NextFunction } from "express";
import RequestWithUser from "../authentication/RequestWithUserInterface"
import * as mongoose from "mongoose";
import HttpException from "../exceptions/HttpException";
import CustomerNotFoundException from "../exceptions/CustomerNotFoundException";
import permits from "../middleware/accesscontrollMiddleware";
import { IUser } from "models/userModel";
import NoAccessRightsException from "../exceptions/NoAccessRightsException";




export class CustomerController{

    private static controller : CustomerController;
    private model: CustomerModel;

    public static getInstance = () => {
        if(!CustomerController.controller){
            CustomerController.controller = new CustomerController();
        }
        return CustomerController.controller;
    }

    private constructor(){
        this.model = new Customer().model;
        //console.log(this.model);
    }

    public createNewCustomer = (request: RequestWithUser, response: Response, next: NextFunction) => {
        let newCustomer = new this.model(request.body);

        newCustomer.save()
            .then(
                savedContact => {
                    console.log("saved new Customer", savedContact);
                    response.status(200).send(`Customer ${savedContact.firstname} ${savedContact.lastname} saved`)
                }
            ).catch(err => {
                next(new HttpException());
            });
    }

    public getCustomers = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        console.log("getCustomers called");
        /*this.model.find({})
            .then(customers => {
                console.log(customers);
                if (customers.length > 0) {
                    response.status(200).send(customers);
                } else {
                    response.status(200).send("There are no Customers")
                }
            }).catch(error => {
                next(new HttpException());
            })
        */
        let query;
        try{
            query = this.buildGetCustomerQuery(request.user);
        }catch(e){
            next(new NoAccessRightsException());
            return;
        }

        query.then(customers => {
            response.status(200).send(customers);
        }).catch(error => {
            next(new HttpException());
        });
    }

    private buildGetCustomerQuery = (user: IUser) : mongoose.DocumentQuery<ICustomer[], ICustomer, {}> => {
        let permit = permits.can(user.role).readAny("customer");
        if (permit.granted) {
            
            let attributes: string = permit.attributes.join(" ");
            let query = this.model.find();

            if(attributes == "*") return query;
            return query.select(attributes);
        }

        permit = permits.can(user.role).readOwn("customer");
        if(permit.granted){
            let attributes: string = permit.attributes.join(" ");
            let ownershipSelector : Object = {_id : user.ownedCustomer};
            let query = this.model.find(ownershipSelector);

            if(attributes == "*") return query;
            return query.select(attributes);
        }
        throw new Error("No access permit");
    }

    public getCustomerById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        const customerID = request.params["customerId"];
        console.log(customerID);
        this.model.findOne({ _id: customerID })
            .then(customer => {
                if (!customer) {
                    next(new CustomerNotFoundException(customerID));
                    return;
                } else {
                    response.status(200).send(customer);
                }
            }).catch(error => {
                next(new HttpException());
            });
    }

    public deleteCustomerById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        const customerID = request.params["customerId"];
        this.model.findOneAndDelete({ _id: customerID })
            .then(deletedCustomer => {
                console.log(deletedCustomer);
                if (!deletedCustomer) { //check for not found
                    next(new CustomerNotFoundException(customerID));
                } else {
                    response.status(200).send(`Customer ${deletedCustomer.firstname} ${deletedCustomer.lastname} found and deleted`);
                }
            }).catch(error => {
                next(new HttpException());
            });
    }
}