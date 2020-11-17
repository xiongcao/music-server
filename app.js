const Koa = require('koa');

const cors = require('koa2-cors');

const session = require('koa-session');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const rest = require('./rest');

// const { parseUser } = require('./utils/tools')

const app = new Koa();

app.use(cors({
  origin: false,
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'GET'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.keys = ['some secret hurr']; // 随机字符串，加密cookie
app.use(session({
  key: 'token', // cookie的键名
  maxAge: 7 * 24 * 60 * 60 * 1000, // 过期时间 7d
  autoCommit: true,
  overwrite: true, // 是否覆盖cookie
  httpOnly: true, // 是否JS无法获取cookie
  signed: true, // 是否生成cookie的签名，防止浏览器暴力篡改
  rolling: false,
  secure: false, // true：则只应通过被 HTTPS 协议加密过的请求发送给服务端 - 当我们在http协议中，试图接受设置 Secure 为 true 的 Cookie 时，服务端会报错
  sameSite: null
}, app));

app.use(async (ctx, next) => {
  await next();
});

// static file support:
let staticFiles = require('./static-files');
app.use(staticFiles('/public/', __dirname + '/public'));
app.use(staticFiles('/static/', __dirname + '/static'));

// parse request body:
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));

// add nunjucks as view:
app.use(templating('views', {
  noCache: true,
  watch: true
}));

// 使用swagger
// app.use(templating('public', {
//   noCache: true,
//   watch: true
// }));

// bind .rest() for ctx:
app.use(rest.restify());
app.use(rest.checkLoginStatus());

// add controllers:
app.use(controller());


app.listen(3000);
console.log('app started at http://localhost:3000');