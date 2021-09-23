import { constants } from 'buffer';
import { Context, Next } from 'koa';
import { StatusCode } from '../constant/StatusCode';
class ErrorMiddleWare {
	errorMiddleware() {
		return async (ctx: Context, next: Next) => {
			try {
				await next();
			} catch (err) {
				ctx.status = err.status || StatusCode.HTTP_INTERNAL_SERVER_ERROR;
				ctx.body = err.message;
				ctx.app.emit('error', err, ctx);
			}
		};
	}
}

const errorMiddleWare: ErrorMiddleWare = new ErrorMiddleWare();
export default errorMiddleWare;
