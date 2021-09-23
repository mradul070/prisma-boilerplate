import { RouterManager } from '../core/RouterManager';
import userController from '../controller/UserController.ts';
import userValidator from '../validator/UserValidator';
import ensureUser from '../middleware/EnsureUser';

const userRouteManager: RouterManager = new RouterManager('/users');

userRouteManager.post('/', userValidator.createUser, userController.createUser);

userRouteManager.get('/', ensureUser.validate, userController.getUser)

export default userRouteManager;
