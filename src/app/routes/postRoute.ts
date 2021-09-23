import { RouterManager } from '../core/RouterManager';
import postContoller from '../controller/PostController';

const postRouteManager: RouterManager = new RouterManager('/post');

postRouteManager.get('/', postContoller.createUser);
postRouteManager.get('/data', postContoller.getPost);

export default postRouteManager;
