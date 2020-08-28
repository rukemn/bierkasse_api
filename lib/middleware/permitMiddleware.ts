import {Response, NextFunction} from "express";
import RequestWithUser from "authentication/RequestWithUserInterface";
import NoAccessRightsException from "../exceptions/NoAccessRightsException"

function permitMiddleware(...roles : string[]){
    return (request : RequestWithUser, Response : Response, next : NextFunction) => {
        if( roles.includes(request.user.role)){
            next();
        }else{
            next(new NoAccessRightsException());
        }
    }
}
export default permitMiddleware;