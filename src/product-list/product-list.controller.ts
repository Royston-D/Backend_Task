import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ProductListService } from './product-list.service';
import { products } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product-list')
export class ProductListController {
    constructor(private productservice: ProductListService){}
    @Get('show-all-products')
    async getAllProducts(): Promise<products[]>{
        return this.productservice.findAll();
    }


    @Post('add-new-product')
    @UseGuards(AuthGuard())
    async createProduct(   
        @Body()
        product : CreateProductDto,
        @Req() req,
        ) : Promise<products>{

        return this.productservice.create(product,req.user);
    }

    @Get('show-productByID')
    async getProduct(
        @Query('_id')
        id: string
    ): Promise<products>{
        return this.productservice.findById(id);
    }

    @Put('update-productByID')
    async updateProduct(
         @Query('_id')
        id: string,
        @Body()
        upProduct: CreateProductDto
  
    ):Promise<products>{
       
      

        return this.productservice.updateById(id, upProduct);
    }




}
