import development from './dev'
import production from './prod'
import test from './test'

const configurationMap = {
	development,
	production,
	test
};

const config = configurationMap[process.env.NODE_ENV];

export default config;