import db from './primsaClient';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Prisma, User } from '@prisma/client';

db.$use(async (params: Prisma.MiddlewareParams, next: any) => {
	if ((params.action === 'create' || params.action === 'update') && params.model === 'User') {
		const user: User = params.args.data;
		const salt: string = genSaltSync(10);
		const hash: string = hashSync(user.password, salt);
		user.password = hash;
	}
	return next(params);
});
