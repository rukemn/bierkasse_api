import { Schema, model, Document, Model } from 'mongoose';

export interface IUser extends Document{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role : string;
}

export interface UserModel extends Model<IUser>{};

export class User {

    private _model: Model<IUser>;

    constructor() {
        const schema =  new Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true , unique : true},
            password: { type: String},
            role : {type : String}
        });

        try{
            this._model = model<IUser>('users');
        }catch(error){
            this._model = model<IUser>('users', schema);
        }
        
    }

    public get model(): Model<IUser> {
        return this._model;
    }
}