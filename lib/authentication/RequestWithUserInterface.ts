import { IUser } from "models/userModel";
import { Request } from "express";

interface RequestWithUser extends Request{
    user : IUser;
}

export default RequestWithUser;