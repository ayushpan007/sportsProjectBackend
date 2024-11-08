const { status } = require('../controller/ping');

module.exports = (router) => {
  router.get('/ping', status);
};