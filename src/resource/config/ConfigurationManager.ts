require('dotenv').config();
export class ConfigurationManager {
	private configurationDetails: any;
	constructor() {
		const env: string = process.env.NODE_ENV || 'development';
		this.configurationDetails = require(`./${env}`).default;
	}

	getConfigurationDetails(): any {
		return this.configurationDetails;
	}
}
