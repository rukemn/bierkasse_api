import RequestWithUser from "authentication/RequestWithUserInterface";
import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import DataStoredInToken from "authentication/DataStoredInToken";
import { User, UserModel, IUser } from "../models/userModel";
import WrongAuthenticationTokenException from "../exceptions/WrongAuthenticationTokenException";
import NoAuthenticationTokenSuppliedException from "../exceptions/NoAuthenticationTokenSuppliedException";

async function authenticationMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    const headers = request.headers;
    console.log(headers);

    if (headers.authorization) {
        console.log(headers.authorization);
        const token = headers.authorization.split(" ")[1]; // idx_1 ="Bearer", idx_2 = actual token
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jwt.verify(token, secret) as DataStoredInToken; // throws if wrong/expired
            console.log(verificationResponse);
            const userId = verificationResponse._id;
            const model: UserModel = new User().model;
            const user: IUser = await model.findById(userId);

            if (user) {
                request.user = user;
                next();
            }else{
                next(new WrongAuthenticationTokenException());
            }

        } catch (error) {
            console.log(`verification threw error ${error}`);
            next(new WrongAuthenticationTokenException());
        }
        
    }else{
        next(new NoAuthenticationTokenSuppliedException());
    }
}
export default authenticationMiddleware;
