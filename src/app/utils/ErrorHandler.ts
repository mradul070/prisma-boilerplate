import { Context } from 'koa';
import { StatusCode } from '../constant/StatusCode';

class ErrorHandler {
	errorHandler(ctx: Context, error: any): string {
		let errorMessage = '';
		if (error.details && error.details.length) {
			console.log('inside');
			error.details.forEach((element: { message: string; }) => {
				if (element.message) {
					errorMessage += element.message.replace(/"/g, '');
				}
			});
			ctx.body = {
				error: errorMessage
			};
			ctx.status = StatusCode.HTTP_BAD_REQUEST;
			return errorMessage;
		} else {
			const errorMessages: Error = (error.error) ? ((error.error.error && error.error.error.message)
				? error.error.error.message : error.error.error) : error.message;
			ctx.body = {
				error: errorMessages
			};
			ctx.status = error.statusCode ? error.statusCode : StatusCode.HTTP_INTERNAL_SERVER_ERROR;
			return errorMessage;
		}
	}
}

const errorHandler: ErrorHandler = new ErrorHandler();
export default errorHandler;
