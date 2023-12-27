import { Body, Controller, Get, NotFoundException, Post, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserLogin } from './schemas/user-login.schema';
import { UserLoginDto } from './dto/user-login.dto';
import { UserAlreadyExistsException } from './exceptions/userAlreadyExistsException';


@Controller('users')
export class UsersController {

    constructor(private usersservice : UsersService){}

    @Get('show-all-users')
    async getAllUsers(): Promise<UserLogin[]>{
        return this.usersservice.findAllUsers();
    }

    @Post('add-new-user')
    async createUser(
        @Body()
        newUser: UserLoginDto
    ) : Promise<{token: string}|{message: string}>{
        const res =  await this.usersservice.create(newUser);
        if(!res){
            throw new UserAlreadyExistsException(newUser.userName);
        }
        return res;

    }
    @Get('login')
    async postUserLogin(
        @Query('userName')
        username: string,
        @Query('userPassword')
        userpassword: string
    ):Promise<{token: string}>{
        const token = await this.usersservice.loginUser(username,userpassword);
        return token;
    }
    @Get('show-userByName')
    async getUserByName(
        @Query('userName')
        username: string
    ): Promise<UserLogin>{
        const res =  await this.usersservice.findUser(username);
        if(!res){
           // console.log(res);
            throw new NotFoundException(`User '${username}' not found in the database`);

        }
        return res;
    }
    

    



}
