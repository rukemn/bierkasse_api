import { Schema, model, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    currentPrice: number;
    bottleSize: number; // in ml
    inStock: number;
    productIcon: string; //should become path / Blob of picture
}

export interface ProductModel extends Model<IProduct> { };

export class Product {
    private _model: Model<IProduct>;

    constructor() {
        const schema = new Schema({
            name: { type: String, required: true },
            currentPrice: { type: Number, required: true },
            bottleSize: { type: Number },
            inStock: { type: Number },
            productIcon: { type: String },
            creation_date: { type: Date, default: Date.now }
        });
        try {
            this._model = model<IProduct>('Product');
        } catch (e) {
            this._model = model<IProduct>('Product', schema);
        }
    }

    public get model(): Model<IProduct> {
        return this._model
    }
}