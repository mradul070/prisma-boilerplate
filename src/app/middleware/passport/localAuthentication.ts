import { User } from '@prisma/client';
import passport from 'koa-passport';
import { Strategy } from 'passport-local';
import db from '../../database/primsaClient';
import { UserInterface } from '../../interface/userInterface';
import authToken from '../../utils/AuthToken';

passport.serializeUser((user: any, done: any) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	try {
		const user: UserInterface = await db.user.findFirst({
			where: {
				id
			},
			rejectOnNotFound: (err) => {throw err; }
		});
		done(null, user);
	} catch (err) {
		done(err);
	}
});

passport.use('local', new Strategy({

	usernameField: 'email',
	passwordField: 'password'
}, async (username, password, done) => {
	try {
		const user: User | null = await db.user.findFirst({ where: {email: username}});
		if (!user) { return done(null, false); }
		try {
			const isMatch: boolean = authToken.validatePassword(password, user.password);
			if (!isMatch) { return done(null, false); }
			done(null, user);
		} catch (err) {
			done(err);
		}
	} catch (err) {
		return done(err);
	}
}));
