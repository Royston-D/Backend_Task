import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { products } from './schemas/product.schema';
import mongoose from 'mongoose';
import { UserLogin } from 'src/users/schemas/user-login.schema';

@Injectable()
export class ProductListService {
    constructor(
        @InjectModel(products.name)
        private productModel : mongoose.Model<products>
    ){}

    async findAll(): Promise<products[]>{
        const productList = await this.productModel.find();
        return productList;
    }

    async create(newproduct : products, user:UserLogin):Promise<products>{
        const data = Object.assign(newproduct,{user: user._id})
        const product = await this.productModel.create(data); 
        return product;
    }

    async findById(id: string): Promise<products>{
        try{
        const product = await this.productModel.findById(id);
        return product;
        }
        catch(err)
        {
            throw new NotFoundException('Product Not Found');
        }
        
    }

    async updateById(id: string, updateProduct: products): Promise<products>{
       
        try{
      return await this.productModel.findByIdAndUpdate(id,updateProduct, {
        new: true,
        runValidators:true
      })
    }
    catch(error){
        throw new NotFoundException('Product Not Found');
    }
    
}
}
