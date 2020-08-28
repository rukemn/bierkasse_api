import { Schema, model, Document, Model } from 'mongoose';

export interface ICustomer extends Document{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    last_Purchase: Date;
    current_bill: Number;
    creation_date: Date;
}

export interface CustomerModel extends Model<ICustomer> {};

export class Customer {
    private _model: Model<ICustomer>;

    constructor() {
        const schema =  new Schema({
            name: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true , unique : true},
            password: { type: String},
            last_Purchase: { type: Date },
            current_bill: {type: Number, default: 0.0},
            creation_date: { type: Date, default: Date.now }
        });

        try{
            this._model = model<ICustomer>('customers');
        }catch(e){
            this._model = model<ICustomer>('customers', schema);
        }
    }

    public get model(): Model<ICustomer> {
        return this._model;
    }
}