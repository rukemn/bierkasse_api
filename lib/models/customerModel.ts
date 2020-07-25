
import { Schema, model, Document, Model } from 'mongoose';

declare interface ICustomer extends Document{
    name: string;
    mail: string;
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
            email: { type: String, required: true },
            last_Purchase: { type: Date },
            current_bill: {type: Number},
            creation_date: { type: Date, default: Date.now }
        });

        this._model = model<ICustomer>('User', schema);
    }

    public get model(): Model<ICustomer> {
        return this._model
    }
}