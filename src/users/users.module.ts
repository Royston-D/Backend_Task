import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLoginSchema } from './schemas/user-login.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'UserLogin',
      schema: UserLoginSchema
    }])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
