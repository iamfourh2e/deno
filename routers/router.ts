import {deleteUser,getAllUsers,getUserByEmail,loginUser,registerUser} from '../controllers/auth_controller.ts';
import {router} from './router_init.ts';
import './product.ts';
import './get_token.ts';

router.post('/register', registerUser);


export default router;