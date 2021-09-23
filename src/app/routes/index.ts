import Koa from 'koa';
import RouterGenerator from '../core/RouterGenerator';
import configuration from '../../resource/config';

// router loader function for loading the routes of specific module
export default (app: Koa) => {
 const dirPath: string = __dirname;
	const baseUrl: string = configuration.baseUrl;

	// router generator will generate routes
	const routerGenerator: RouterGenerator = new RouterGenerator(dirPath, baseUrl);

	// generating the routes of specific module
	routerGenerator.generateRoute(app);
};
