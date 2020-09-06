import HttpException from "./HttpException";

class WrongLoginCredentialsException extends HttpException{
    constructor(){
        super(401, "Wrong password or email");
    }
}

export default WrongLoginCredentialsException;