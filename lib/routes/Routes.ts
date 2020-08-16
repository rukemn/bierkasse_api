// /lib/routes/crmRoutes.ts
import {Request, Response} from "express";
import { CustomerController } from "../controllers/CustomerController";
import {ProductController} from "../controllers/ProductController";
import validate from "../middleware/validation"
import CreateCustomerDto from "../validationDto/CreateCustomerDto";
import SpecificCustomerDto from "../validationDto/SpecificCustomerDto";
import CreateProductDto from "../validationDto/CreateProductDto";

export class Routes {

    public customerController : CustomerController = new CustomerController();  
    public productController : ProductController = new ProductController();      

    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfull'
            })
        })

        //show items
        app.route('/items')
        .get(this.productController.getProducts)
        // CREATE items
        .post(validate(CreateProductDto), this.productController.createNewProduct)
        // UPDATE items, maybe use patch
        .put((req: Request, res: Response) => {
        	res.status(501).send({
        		message : "not implemented yet"
        	})
        })

        app.route('/items/:productId')
        .get(this.productController.getProductById)
        .delete(this.productController.deleteProductById)

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