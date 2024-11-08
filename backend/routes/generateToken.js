const { login,registerUser } = require('../controller/generateToken');

module.exports = (router) => {
  router.post('/registerUser',registerUser );
  router.post("/login",login)
};