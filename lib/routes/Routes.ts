// /lib/routes/crmRoutes.ts
import {Request, Response, request} from "express";
import { CustomerController } from "../controllers/CustomerController";
import {ProductController} from "../controllers/ProductController";
import AuthenticationController from "../authentication/AuthenticationController"
import validate from "../middleware/validation"
import CreateUserDto from "../dataTransferObjects/CreateUserDto";
import SpecificCustomerDto from "../dataTransferObjects/SpecificCustomerDto";
import CreateProductDto from "../dataTransferObjects/CreateProductDto";
import LogInDto from "../dataTransferObjects/LogInDto";
import authenticationMiddleware from "../middleware/authenticationMiddleware";

export class Routes {

    public authController : AuthenticationController = AuthenticationController.getInstance();
    public customerController : CustomerController = CustomerController.getInstance();
    public productController : ProductController = ProductController.getInstance();

    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfull'
            })
        });

        app.route("/auth/register").post(validate(CreateUserDto), this.authController.registration);
        app.route("/auth/login").post(validate(LogInDto), this.authController.loggingIn);

        //show items
        app.route('/items')
        .get(authenticationMiddleware,this.productController.getProducts)
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
        .post( validate(CreateUserDto), this.customerController.createNewCustomer)
        .get(this.customerController.getCustomers);

        //Look up by ID
        app.route('/customer/:customerId')
        .get(validate(SpecificCustomerDto, false) , this.customerController.getCustomerById)
        .delete(validate(SpecificCustomerDto, false), this.customerController.deleteCustomerById);
    }
}