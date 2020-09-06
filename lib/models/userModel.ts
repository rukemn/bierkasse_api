import { Schema, model, Document, Model, Mongoose } from 'mongoose';
enum roles{
    user = "user",
    bq = "bierquaestor",
    hbq = "hauptbierquaestor",
    admin = "admin"
}
interface IUser extends Document{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role : string; // enum : ["user" , "bq", "hbq", "admin"]
    ownedCustomer : Schema.Types.ObjectId;
}

interface UserModel extends Model<IUser>{};

class User {
    
    private _model: Model<IUser>;

    constructor() {
        const schema =  new Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true , unique : true},
            password: { type: String},
            role : {type : String},
            ownedCustomer : {
                type : Schema.Types.ObjectId,
                ref : 'customer',
            }
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

export {User, IUser, UserModel, roles}