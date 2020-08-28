import HttpException from "./HttpException"

class NoAccessRightsException extends HttpException{
    constructor(){
        /*
        maybe refactor/split out into 404 if we do not want to give the 
        client the information, that the requested ressource even exists.
        */
        super(403, "Forbidden from accessing this ressource"); 
    }
}

export default NoAccessRightsException;