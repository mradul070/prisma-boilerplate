import { Context } from 'koa';
import userService from '../service/UserService';
import { Message } from '../constant/Messages';
import { StatusCode } from '../constant/StatusCode';
import logger from '../../logger';
import errorHandler from '../utils/ErrorHandler';
import { UserInterface } from '../interface/userInterface';

class UserController {
	constructor() { }

	async createUser(ctx: Context) {
		try {
			logger.info(`Controller: createUser, Request-Body: ${JSON.stringify(ctx.request.body)}`);
			await userService.createUser(ctx);
			ctx.body = {
				message:  Message.USER_CREATED
			};
			ctx.status = StatusCode.HTTP_CREATED;
		} catch (error) {
			console.log(error);
			const errorMessage: string = errorHandler.errorHandler(ctx, error);
			logger.error(`Controller: createUser, Error: ${JSON.stringify(errorMessage)}`);
		}
	}

	async getUser(ctx: Context) {
		try {
			const user: UserInterface | null = await userService.getUsers(ctx);
			if (!user) {
				ctx.body = Message.USER_NOT_FOUND;
				ctx.status = StatusCode.HTTP_NO_CONTENT;
			}
			ctx.body = user;
			ctx.status = StatusCode.HTTP_SUCCESS_OK;
		} catch (error) {
			const errorMessage: string = errorHandler.errorHandler(ctx, error);
			logger.error(`Controller: createUser, Error: ${JSON.stringify(errorMessage)}`);
		}
	}

	async updateUser(ctx: Context) {
		try {
			logger.info(`Controller: updateUser, Request-Body: ${ctx.request.body}`);
			await userService.updateUser(ctx);
			ctx.body = {
				message: Message.USER_INFORMATION_UPDATED
			};
			ctx.status = StatusCode.HTTP_SUCCESS_OK;
		} catch (error) {
			console.log(error);
			const errorMessage: string = errorHandler.errorHandler(ctx, error);
			logger.error(`Controller: createUser, Error: ${JSON.stringify(errorMessage)}`);
		}
	}
}

const userController: UserController = new UserController();
export default userController;
