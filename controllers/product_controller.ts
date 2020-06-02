import DB from '../routers/DBinit.ts';
import ProuctInterface from '../models/product.ts';
import ProductInterface, {products} from '../models/product.ts';
export const addProduct = async({req,res} : {req: any, res: any}) =>{
    const {name, price,desc} = req.body;
    const doc: ProductInterface = {
        name,
        price,
        desc
    }
    const insertedId = await products.insertOne(doc);

    return {
        id: insertedId,
        message: "success"
    }


}