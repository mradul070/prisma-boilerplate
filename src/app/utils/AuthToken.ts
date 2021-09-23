import { Context } from 'koa';
import { sign } from 'jsonwebtoken';
import config from '../../resource/config';
import { compareSync } from 'bcryptjs';

class AuthToken {
	constructor() { }

	getToken(ctx: Context): string | null {
		const header: string | undefined = ctx.header.authorization;
		if (!header) {
			return null;
		}
		const headerWithBearer: string[] = header.split(' ');
		if (headerWithBearer.length !== 2) {
			return null;
		}
		const scheme: string = headerWithBearer[0];
		const token: string = headerWithBearer[1];
		if (/^Bearer$/i.test(scheme)) {
			return token;
		}
		return null;
	}

	generateToken(userId: number): string {
		const token: string = sign({
			id: userId
		}, config.secretToken);
		return token;
	}

	validatePassword(newPassword: string, password: string) {
		const isMatched: boolean = compareSync(newPassword, password);
		return isMatched;
	}
}

const authToken: AuthToken = new AuthToken();
export default authToken;
