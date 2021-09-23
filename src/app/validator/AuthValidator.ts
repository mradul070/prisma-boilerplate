import { Context, Next } from 'koa';
import Joi from 'joi';
import errorHandler from '../utils/ErrorHandler';
import logger from '../../logger';

class AuthValidator {
	constructor() { }
	async authenticate(ctx: Context, next: Next): Promise<Next | void> {
		try {
			const bodyValidation = Joi.object({
				email: Joi.string().email().required(),
				password: Joi.string().required().min(8)
			});
			const body = ctx.request.body;
			const { error } = bodyValidation.validate(body);
			if (error) {
				const errorMessage: string = errorHandler.errorHandler(ctx, error);
				logger.error(`Validation: authenticate, Error: ${errorMessage}`);
				return;
			}
			return next();
		} catch (error) {
			console.log(error);
			const errorMessage: string = errorHandler.errorHandler(ctx, error);
			logger.error(`Validation: authenticate, Error: ${errorMessage}`);
			return;
		}
	}
}

const authValidator: AuthValidator = new AuthValidator();
export default authValidator;
