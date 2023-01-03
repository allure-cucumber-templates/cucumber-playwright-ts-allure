const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return params;
};

export default {
  requireModule: ['ts-node/register'],
  require: [
    'steps/**/*.ts',
    'test_resources/**/.ts',
    'conf/**/.ts',
    'conf/reporters/allure-reporter.ts',
  ],
  format: [
    'summary',
    'progress-bar',
    '@cucumber/pretty-formatter',
    './conf/reporters/allure-reporter.ts:OUTPUT.txt',
    'rerun:@rerun.txt'
  ],
  formatOptions: { snippetInterface: 'async-await' },
  worldParameters: getWorldParams(),
  publishQuiet: true,
};
