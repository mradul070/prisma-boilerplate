import { Context } from 'koa';
import { UserInterface } from '../interface/userInterface';
import db from '../database/primsaClient';

class UserService {
	constructor() {}
	async createUser(ctx: Context): Promise<void> {
		const firstName: string = ctx.request.body.firstName;
		const lastName: string = ctx.request.body.lastName;
		const email: string = ctx.request.body.email;
		const password: string = ctx.request.body.password;
		await db.user.create({
			data: {
				firstName,
				lastName,
				email,
				password
			}
		});
	}
	async getUsers(ctx: Context): Promise<UserInterface | null> {
		console.log(ctx.state.user)
		const user: UserInterface | null = await db.user.findFirst({
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				createdAt: true,
				updatedAt: true
			}
		});
		return user;
	}
	async deleteUser(ctx: Context): Promise<void> {
		const userId: number = ctx.params.id;
		await db.user.delete({
			where: {
				id: userId
			}
		});
	}
	async updateUser(ctx: Context): Promise<void> {
		const userId: number = ctx.params.id;
		const firstName: string = ctx.request.body.firstName;
		const lastName: string = ctx.request.body.lastName;
		const email: string = ctx.request.body.email;
		await db.user.update({
			where: {
				id: userId
			},
			data: {
				firstName,
				lastName,
				email
			}
		});
	}
}

const userService: UserService = new UserService();
export default userService;
