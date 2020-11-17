module.exports = {
  'GET /': async (ctx, next) => {
    ctx.render('index.html');
  },
  'GET /swagger': async (ctx, next) => {
    ctx.render('index.html');
  }
};