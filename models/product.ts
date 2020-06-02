import DB from '../routers/DBinit.ts';

interface ProductInterface {
    name: {
        type: String,
    },
    price: {
        type: Number
    },
    desc ?: {
        type: String 
    }
}

export const  products = DB.collection('products');

export default ProductInterface;