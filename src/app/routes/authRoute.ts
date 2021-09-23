import { RouterManager } from '../core/RouterManager';
import authController from '../controller/AuthController';
import authValidator from '../validator/AuthValidator'

const authRouteManager: RouterManager = new RouterManager('/auth');

authRouteManager.post('/', authValidator.authenticate ,authController.authenticate);

export default authRouteManager;
