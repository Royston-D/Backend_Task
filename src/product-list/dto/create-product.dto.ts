
import { IsEmpty } from "class-validator";
import { UserLogin } from "src/users/schemas/user-login.schema";

export class CreateProductDto{
    readonly productName: string;
    readonly  productPrice: number;

    @IsEmpty()
    readonly user:UserLogin;
}