import HttpException from "./HttpException";

class NoAuthenticationTokenSuppliedException extends HttpException{
    constructor(){
        super(401, "Must supply authentication token");
    }
}

export default NoAuthenticationTokenSuppliedException;