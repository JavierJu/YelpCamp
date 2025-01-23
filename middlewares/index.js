const auth = require('./auth');
const validators = require('./validators');
const permissions = require('./permissions');

module.exports = {
    ...auth,
    ...validators,
    ...permissions,
};
