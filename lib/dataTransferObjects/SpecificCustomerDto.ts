import {IsMongoId} from "class-validator";


/*
    The only purpse of this class is to serve validation
*/
class SpecificCustomerDto{
    
    @IsMongoId({message: "CustomerId is not valid"})
    public customerId : string;
}

export default SpecificCustomerDto;