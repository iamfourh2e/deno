import {welcome} from '../controllers/auth_controller.ts';
import {router} from './router_init.ts';
import './product.ts';
import './get_token.ts';

router.get('/welcome', welcome);

export default router;


