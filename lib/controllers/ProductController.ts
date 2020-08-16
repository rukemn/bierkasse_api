import {Request, Response, NextFunction, request} from "express";
import * as mongoose from "mongoose";
import HttpException from "../exceptions/HttpException";
import {Product, ProductModel} from "../models/productModel"
import ProductNotFoundException from "../exceptions/ProductNotFoundException";

export class ProductController{
    private model : ProductModel;

    constructor(){
        this.model = new Product().model;
    }

    public createNewProduct = async (request : Request , response : Response, next : NextFunction) => {
        let newProduct = new this.model(request.body);
        newProduct.save()
        .then(savedProduct => {
                response.status(200).send(`Product ${savedProduct.name} saved.`);
            }
        ).catch(error => {
            next(new HttpException());
        }); 
    }

    public getProducts = async (request: Request, response: Response, next : NextFunction) => {
        this.model.find()
        .then( products => {
            console.log(products);
            if(products.length > 0){
                response.status(200).send(products);
            }else{
                response.status(200).send("There are no products yet");
            }
        }).catch( error => {
            next(new HttpException());
        })
    };

    public getProductById = async (request: Request, response: Response, next : NextFunction) => {
        const productID = request.params["productId"];
        this.model.findOne({_id : productID})
        .then( product => {
            if(!product){ //check for not found
                next(new ProductNotFoundException(productID));
            }else{
                response.status(200).send(product);
            }
        }).catch( error => {
            next(new ProductNotFoundException(productID));
        });
    };

    public deleteProductById = async (request: Request, response: Response, next : NextFunction) => {
        const productID = request.params["productId"];
        this.model.findOneAndDelete({_id : productID})
        .then( deletedProduct => {
            if(!deletedProduct){ //check for not found
                next(new ProductNotFoundException(productID));
            }else{
                response.status(200).send({message : `Product ${deletedProduct.name} found and deleted`});
            }
        }).catch( error => {
            next(new HttpException());
        });
    }
}
