import { Schema, model, Document, Model } from 'mongoose';

declare interface ICustomer extends Document{
    firstname: string;
    lastname: string;
    email: string;
    last_Purchase: Date;
    current_bill: Number;
    creation_date: Date;
}

export interface CustomerModel extends Model<ICustomer> {};

export class Customer {

    private _model: Model<ICustomer>;

    constructor() {
        const schema =  new Schema({
            firstname: { type: String, required: true },
            lastname: { type: String, required: true },
            email: { type: String, required: true , unique : true},
            last_Purchase: { type: Date },
            current_bill: {type: Number, default: 0.0},
            creation_date: { type: Date, default: Date.now }
        });

        this._model = model<ICustomer>('customers', schema);
    }

    public get model(): Model<ICustomer> {
        return this._model;
    }
}