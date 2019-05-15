const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, jsonPointers: true, $data: true });
require('ajv-errors')(ajv);
// require('ajv-keywords')(ajv, 'switch');
// require('ajv-keywords')(ajv, ['formatMinimum', 'formatMaximum']);

const getErrors = errors => (
  errors ?
    errors.map(item => [item.dataPath.replace(/\//g, '.').replace('.', ''), item.message]) : []
);

const validate = (scheme, data) => {
  const valid = ajv.validate(scheme, data);
  return { valid, errors: getErrors(ajv.errors) };
};

module.exports = validate;
