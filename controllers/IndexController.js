module.exports = {
  // index/test/:1     => params.id
  // index/test?id=1  => query.id

  'GET /': async ctx => {
    ctx.render('index.html');
  },
  'GET /swagger': async ctx => {
    ctx.render('swagger.html');
  }
};