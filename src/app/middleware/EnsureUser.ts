import { Context, Next } from 'koa';
import authToken from '../utils/AuthToken';
import { verify } from 'jsonwebtoken'
import config from '../../resource/config'
import db from '../database/primsaClient';
import { StatusCode } from '../constant/StatusCode';
class EnsureUser {
	async validate(ctx: Context, next: Next) {
		const token: string | null = authToken.getToken(ctx)
		if (!token) {
			ctx.throw(StatusCode.HTTP_UNAUTHORIZED)
		}
		let decoded: any
		try {
			decoded = verify(token, config.secretToken)
		} catch (err) {
			ctx.throw(StatusCode.HTTP_UNAUTHORIZED)
		}
		ctx.state.user = await db.user.findFirst({
			where: {
				id: decoded.id
			}
		})
		if (!ctx.state.user) {
			ctx.throw(StatusCode.HTTP_UNAUTHORIZED)
		}
		return next()
	}
}

const ensureUser: EnsureUser = new EnsureUser()
export default ensureUser