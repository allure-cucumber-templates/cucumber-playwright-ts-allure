const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return params;
};

const config = {
  requireModule: ['ts-node/register'],
  //require: ['src/**/*.ts'],
  require: ['steps/**/*.ts', 'test_resources/**/*.ts', 'conf/**/*.ts'],
  format: [
    'summary',
    'progress-bar',
    '@cucumber/pretty-formatter',
    './conf/reporters/allure-reporter.ts:OUTPUT.txt',
    'rerun:@rerun.txt',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  worldParameters: getWorldParams(),
  publishQuiet: true,
};

if (process.env.USE_ALLURE === 'true') {
  config.format.push('./conf/reporters/allure-reporter.ts');
} else {
  config.format.push('@cucumber/pretty-formatter');
}
export default config;
