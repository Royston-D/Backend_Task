import { Module } from '@nestjs/common';
import { ProductListController } from './product-list.controller';
import { ProductListService } from './product-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'products',
      schema: ProductSchema
    }]),
    UsersModule,
  ],
  controllers: [ProductListController],
  providers: [ProductListService]
})
export class ProductListModule {}
