import { IsString, IsEmail } from "class-validator";

class LogInDto{
    @IsEmail(undefined, {message : "Email must be valid"})
    public email : string

    @IsString()
    public password : string;
}

export default LogInDto;