import { IsAlpha, IsPositive, IsInt, IsOptional } from "class-validator";

class CreateProductDto{

    @IsAlpha(undefined, {message : "product name must only consist of letters"})
    public name : string;

    @IsPositive({message : "The price can only be positive"}) // Todo, maybe go for @IsCurrency() string validation
    public currentPrice : number;

    @IsPositive({message : "The bottlesize can only be positive"})
    public bottleSize : number;

    @IsPositive({message: "There can only be a positive amount of instock items"})
    @IsInt({message : "The items in stock can only be integer"})
    public inStock : number;
    
    @IsOptional()
    public productIcon : string;
}

export default CreateProductDto;