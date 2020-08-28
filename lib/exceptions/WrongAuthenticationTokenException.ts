import HttpException from "./HttpException";

class WrongAuthenticationTokenException extends HttpException{

    constructor(){
        super(403, "The supplied token did not match");
    }
}

export default WrongAuthenticationTokenException;