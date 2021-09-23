export default {
	port: process.env.PORT || 3000,
	environment: process.env.NODE_ENV || 'development',
	baseUrl: process.env.BASE_URL || '/api/v1',
	session: process.env.SESSION || 'secret-boilerplate-token',
	secretToken: process.env.SECRET_TOKEN || 'secret-jwt-token',
	databaseUrl: process.env.DATABASE_URL
};
