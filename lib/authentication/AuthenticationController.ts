import * as bcrypt from "bcrypt";
import {Request , Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import CreateUserDto from "dataTransferObjects/CreateUserDto";
import CustomerWithThatEmailAlreadyExistsException from "../exceptions/CustomerWithThatEmailAlreadyExists";
import WrongLoginCredentialsException from "../exceptions/WrongLoginCredentialsException";
import LogInDto from "../dataTransferObjects/LogInDto"
import TokenData from "./TokenData";
import DataStoredInToken from "./DataStoredInToken";
import { UserModel, User, IUser } from "../models/userModel";

class AuthenticationController {
    
    private model : UserModel;
    private static controller : AuthenticationController;

    private constructor(){
        this.model = new User().model;
    }

    public static getInstance = () => {
        if(!AuthenticationController.controller){
            AuthenticationController.controller = new AuthenticationController();
        }
        return AuthenticationController.controller;
    }

    public registration = async (request : Request, response : Response, next: NextFunction) => {
        const userData : CreateUserDto =  request.body; 
        console.log(userData);
        if(await this.model.findOne({ email: userData.email})){
            next(new CustomerWithThatEmailAlreadyExistsException(userData.email))
        }else{
            const hashedPassword = await bcrypt.hash(userData.password, 10); //salt = 10
            console.log(`hashed pw: ${hashedPassword}`);
            request.body.password = hashedPassword;
            const newCustomer = await new this.model({...userData}).save();
            newCustomer.password = undefined;
            newCustomer.__v = undefined;
            const token = this.createToken(newCustomer);
            console.log(token);
            console.log(`created token ${token}`);
            response.status(200).send(token);
        }
    }
    
    public loggingIn = async (request : Request, response : Response, next: NextFunction) => {
        const logInData : LogInDto = request.body;
        const user = await this.model.findOne({email: logInData.email});
        if(user){
            const passwordMatches = await bcrypt.compare(logInData.password, user.password);
            if(passwordMatches){
                user.password = undefined;
                const token = this.createToken(user);
                console.log(`Password matches for ${user}`);
                response.send(token)
            }else{
                next(new WrongLoginCredentialsException);
            }
        }else{ // no mail found
            next(new WrongLoginCredentialsException);
        }
    }


    public createToken(user : IUser) : TokenData{
        const expiration = 60*60*24; // one day
        const secret = process.env.JWT_SECRET

        const dataInToken : DataStoredInToken = {
            _id : user.id
        };

        const tokendata : TokenData = {
            expiresIn: expiration,
            token :  jwt.sign(dataInToken,secret,{expiresIn: expiration})
        }

        return tokendata;
    }
}

export default AuthenticationController;