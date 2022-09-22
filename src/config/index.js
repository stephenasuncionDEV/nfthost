import development from './dev';
import production from './prod';

const configurationMap = {
	development,
	production
};

const config = configurationMap[process.env.NODE_ENV];

export default config;