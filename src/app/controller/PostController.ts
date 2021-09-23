import { Context } from 'koa';
class PostContoller {
	constructor() { }

	async createUser(ctx: Context) {
		try {
			console.log(ctx.request.body);
			const data = ctx.request.body;
			data.authorId = 1;
			// await prisma.post.create({
			//     data: data
			// })
			ctx.body = 'Post created';
		} catch (error) {
			console.log(error);
		}
	}

	async getPost(ctx: Context) {
		try {
			console.log('here');
		} catch (error) {
			console.log(error);
		}
	}
}

const postContoller: PostContoller = new PostContoller();
export default postContoller;
