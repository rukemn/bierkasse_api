import {plainToClass} from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";
import HttpException from "../exceptions/HttpException";
import bodyParser = require("body-parser");

function validation<T>(classType : any, body: boolean = true) : express.RequestHandler{
    return(request: express.Request , response : express.Response, next: express.NextFunction) => {
        validate(
            plainToClass(classType, body ? request.body : request.params) 
            )
        .then((errors : ValidationError[]) => {
            if(errors.length > 0){ // something didn't validate
                const message = errors.map( (error : ValidationError) =>  Object.values(error.constraints))
                    .join(", ");
                console.log(message);
                next(new HttpException(400, message));
                
            }else{ // no calidation concerns
                next();
            }
        })
    }
}

export default validation;