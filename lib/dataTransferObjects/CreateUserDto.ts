import {IsEmail, IsAlpha, minLength, isAlphanumeric, Length, MinLength, Matches} from "class-validator"


class CreateUserDto {

    @Length(2,20, {message : "Length of lastname must be between(including) 2 and 20"})
    @IsAlpha(undefined, {message : "Firstname can only contain Letters"})
    public firstname : string;

    @Length(2,20, {message : "Length of lastname must be between(including) 2 and 20"})
    @IsAlpha(undefined, {message : "Lastname can only contain Letters"})
    public lastname : string;

    @IsEmail(undefined, {message : "Email must be valid"})
    public email : string;

    //@Matches(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])$")) // 1 lowercase, 1 uppercase, 1 digit; THIS IS BUGGED BY NPM-PACKAGE
    @Length(8,20,{message : "Length of password must be between(including) 8 and 20"})
    public password : string;
}

export default CreateUserDto;