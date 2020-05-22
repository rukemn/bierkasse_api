"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const crmController_1 = require("../controllers/crmController");
class Routes {
    constructor() {
        this.contactController = new crmController_1.ContactController();
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
        app.route('/contact')
            .post(this.contactController.addNewContact)
            .get(this.contactController.getContacts);
        //Look up by ID
        app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map