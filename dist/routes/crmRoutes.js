"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const CustomerController_1 = require("../controllers/CustomerController");
class Routes {
    constructor() {
        this.customerController = new CustomerController_1.CustomerController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll'
            });
        });
        //show items
        app.route('/items')
            .get((req, res) => {
            res.status(200).send({
                message: [{ "name": "Krom", "price": 1.10 },
                    { "name": "Früh", "price": 1.10 },
                    { "name": "Apfelsaft", "price": 1.30 }]
            });
        })
            // CREATE items
            .post((req, res) => {
            res.status(200).send({
                message: "recieved item POST request"
            });
        })
            // CREATE/UPDATE items
            .put((req, res) => {
            res.status(200).send({
                message: "recieved item UPDATE/CREATE request"
            });
        });
        // Create a new contact
        app.route('/customer')
            .post(this.customerController.addNewCustomer)
            .get(this.customerController.getCustomers);
        //Look up by ID
        app.route('/customer/:customerId')
            .get(this.customerController.getCustomerById);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map