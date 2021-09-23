import passport from 'koa-passport';
import { Context, Next } from 'koa';
import authToken from '../utils/AuthToken';
import errorHandler from '../middleware/ErrorHandler';
import { StatusCode } from '../constant/StatusCode';
import { User } from '@prisma/client';
class AuthController {
	async authenticate(ctx: Context, next: Next) {
		try {
			return passport.authenticate('local', (err, user: User) => {
				if (err || !user) {
					ctx.throw(StatusCode.HTTP_UNAUTHORIZED);
				}
				const token = authToken.generateToken(user.id);
				ctx.status = StatusCode.HTTP_SUCCESS_OK;
				ctx.append('Authorization', token);
			})(ctx, next);
		} catch (error) {
			errorHandler.errorMiddleware();
		}
	}
}
const authController: AuthController = new AuthController();
export default authController;
