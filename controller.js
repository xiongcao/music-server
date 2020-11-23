const fs = require('fs');

function handleControllerName(path, f) {
  /**
   * flag: 是否开启添加默认控制器名称
   * 如：AdminController -> /api/test，转换成/api/admin/test
   */
  let flag = false;

  if (flag) {
    // 获取控制器名称，使之在 ‘api/’ 后面默认添加控制器名
    let name = f.substr(0, f.indexOf('Controller'));
    let first = name[0].toLowerCase();
    let secode = name.substring(1);
    name = first + secode;
  
    if (path.startsWith('/api')) { // 接口路由
      let api = path.slice(0, 4);
      let rest = path.slice(4);
      return api + '/' + name + rest;
    } else { // 静态文件
      return path;
    }
  }
  return path;
}

function addMapping(router, mapping, filename) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      path = handleControllerName(path, filename);
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5);
      path = handleControllerName(path, filename);
      router.post(path, mapping[url]);
    } else if (url.startsWith('PUT ')) {
      let path = url.substring(4);
      path = handleControllerName(path, filename);
      router.put(path, mapping[url]);
    } else if (url.startsWith('DELETE ')) {
      let path = url.substring(7);
      path = handleControllerName(path, filename);
      router.del(path, mapping[url]);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers(router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter((f) => {
    return f.endsWith('.js');
  }).forEach((f) => {
    let mapping = require(__dirname + '/' + dir + '/' + f);
    
    addMapping(router, mapping, f);
  });
}

module.exports = function (dir) {
  let
    controllers_dir = dir || 'controllers',
    router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};