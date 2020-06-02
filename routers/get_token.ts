import {router} from './router_init.ts';
import {getToken,validateToken} from '../controllers/get_token.ts';
router.get('/get_token', getToken);
router.get('/validate_jwt', validateToken);