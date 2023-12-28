import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLoginSchema } from './schemas/user-login.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'UserLogin',
      schema: UserLoginSchema
    }]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return{
          secret: config.get<string | any>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRE')
          }
        }
      }

    })
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  exports: [UsersService,JwtStrategy,PassportModule]
})
export class UsersModule {}
