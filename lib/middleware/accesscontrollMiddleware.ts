import * as ac from "accesscontrol";
import {Response, NextFunction} from "express";
import RequestWithUser from "authentication/RequestWithUserInterface";
import { IProduct } from "models/productModel";
import { ICustomer } from "models/customerModel";
import { AccessControl } from "accesscontrol";

enum roles {
    admin = "admin",
    hbq = "hauptbierquaestor",
    bq = "bierquaestor",
    user = "user"
}

const grants = {
    admin : {
        customer : {
            "create:any" : ["*"],
            "read:any" : ["*"],
            "update:any" : ["*"],
            "delete:any" : ["*"]
        },
        product : {
            "create:any" : ["*"],
            "read:any" : ["*"],
            "update:any" : ["*"],
            "delete:any" : ["*"]
        },
        order : {
            //todo
        }
    },
    bierquaestor : {
        customer : {
            "create:any" : [],
            "read:any" : [],
            "update:any" : [],
            "delete:any" : []
        },
    },
    hauptbierquaestor : {
        customer : {
            "create:any" : [],
            "read:any" : [],
            "update:any" : [],
            "delete:any" : []
        },
    },
    user : {
        customer : {
            "create:own" : ["*"],
            "read:any" : ["lastname", "firstname"],
            "read:own" : ["lastname", "firstname", "email", "current_bill"],
            "update:own" : ["lastname", "firstname", "email"]
        },
        product : {
            "read:any" : ["name", "currentPrize", "bottleSize"]
        }
    }
}
const permits : AccessControl = new ac.AccessControl(grants);

export default permits;