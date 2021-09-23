import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import passport from 'koa-passport';
import helmet from 'koa-helmet';
import convert from 'koa-convert';
import mount from 'koa-mount';
import serve from 'koa-static';
import routes from '../app/routes';
import '../app/database/prismaMiddleware';
import config from '../resource/config/index';
import { Middleware } from 'koa-compose';
import '../app/middleware/passport/localAuthentication';

const app: Koa = new Koa();
const _use: Function = app.use;
app.use = (x: Middleware<any>) => _use.call(app, convert(x));

app.use(helmet({
	contentSecurityPolicy: false,
}));
app.use(logger());
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());
routes(app);

if (['development', 'staging'].includes(config.environment)) {
	console.log(config.environment);
	app.use(mount('/swagger', serve(`${process.cwd()}/src/resource/swagger`)));
}

app.listen(config.port, () => {
	console.log(`Server started at ${config.port}`);
});
