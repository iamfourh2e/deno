import {addProduct} from '../controllers/product_controller.ts';
import {router} from './router_init.ts';
router.post('/add_product', addProduct);
