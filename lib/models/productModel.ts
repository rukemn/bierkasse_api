import { Schema, model, Document, Model } from 'mongoose';

declare interface IProduct extends Document{
    name: string;
    currentPrice: Number;
    bottleSize: Number;
    instock: Number;
    productIcon: string; // should become path / picture
} 

export interface ProductModel extends Model<IProduct>{};

export class Product{
    private _model: Model<IProduct>;

    constructor() {
        const schema = new Schema({
            name : {type: String, required: true},
            currentPrice: {type: Number},
            bottleSize: {type: Number},
            instock: {type: Number}, 
            productIcon: {type: String},
            creation_date: {type: Date, default: Date.now}
        });


    this._model = model<IProduct>('Product', schema);
    }

    public get model(): Model<IProduct> {
        return this._model
    }
}