const status = (_, res) => {
  res.send({
    status: 'ok',
  });
};
module.exports = { status };
