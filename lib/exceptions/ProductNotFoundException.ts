import HttpException from "./HttpException";

class ProductNotFoundException extends HttpException{
    constructor(productId : String){
        super(404 , "Product with with ID " + productId + " not found");
    }
}

export default ProductNotFoundException;