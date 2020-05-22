// /lib/routes/crmRoutes.ts
import {Request, Response} from "express";
import { ContactController } from "../controllers/crmController";

export class Routes {

    public contactController : ContactController = new ContactController();       
    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll'
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
        app.route('/contact')
        .post(this.contactController.addNewContact)
        .get(this.contactController.getContacts);


        //Look up by ID
        app.route('/contact/:contactId')
        .get(this.contactController.getContactWithID)
    }
}