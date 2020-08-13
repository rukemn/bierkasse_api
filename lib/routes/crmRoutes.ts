// /lib/routes/crmRoutes.ts
import {Request, Response} from "express";
import { CustomerController } from "../controllers/CustomerController";
import validate from "../middleware/validation"
import CreateCustomerDto from "../validationDto/CreateCustomerDto";
import SpecificCustomerDto from "../validationDto/SpecificCustomerDto";

export class Routes {

    public customerController : CustomerController = new CustomerController();       
    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfull'
            })
        })

        //show items
        app.route('/items')
        .get((req: Request, res: Response) => {
        	res.status(200).send({
        		message: [{"name": "Krom", "price" : 1.10},
        		{"name": "Früh", "price" : 1.10},
        		{"name": "Apfelsaft", "price" : 1.30}]
        	})
        })
        // CREATE items
        .post((req: Request, res: Response) => {
        	res.status(200).send({
        		message : "recieved item POST request"
        	})
        })
        // CREATE/UPDATE items
        .put((req: Request, res: Response) => {
        	res.status(200).send({
        		message : "recieved item UPDATE/CREATE request"
        	})
        })

        // Create a new contact
        app.route('/customer')
        .post( validate(CreateCustomerDto), this.customerController.createNewCustomer)
        .get(this.customerController.getCustomers);

        //Look up by ID
        app.route('/customer/:customerId')
        .get(validate(SpecificCustomerDto, false) , this.customerController.getCustomerById)
        .delete(validate(SpecificCustomerDto, false), this.customerController.deleteCustomerById);
    }
}