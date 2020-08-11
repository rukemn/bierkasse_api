import HttpException from "./HttpException";

class CustomerNotFoundException extends HttpException{
    constructor(customerId : String){
        super(404 , "Customer with with ID " + customerId + " not found");
    }
}

export default CustomerNotFoundException;