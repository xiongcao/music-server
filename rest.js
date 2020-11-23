const { parseUser } = require('./utils/tools')

module.exports = {
  APIError: function (code, message) {
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
  },

  /**
   * 封装分页数据
   * @content 列表数据集合；
   * @page 当前页码；
   * @size 每页显示多少条数据；
   * @totalCount 总数量；
   */
  pageTable: (content, page, size, totalCount) => {
    return {
      content: content || [],
      page,
      size,
      currentPage: page,
      currentCount: content.length || 0,
      totalPages: Math.ceil(totalCount / size),
      totalCount
    }
  },
  
  /**
   * 中间件：封装最后结果
   */
  restify: (pathPrefix) => {
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
      if (ctx.request.path.startsWith(pathPrefix)) {
        ctx.rest = (data = null, code = 0, msg = '成功') => {
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code, msg, data
          };
        }
        try {
          await next();
        } catch (e) {
          ctx.response.status = 500;
          ctx.response.type = 'application/json';
          ctx.response.body = {
            code: e.code || 'internal:unknown_error',
            message: e.message || ''
          };
        }
      } else {
        await next();
      }
    };
  },

  /**
   * 中间件：校验接口是否需要登录
   */
  checkLoginStatus: () => {
    return async (ctx, next) => {
      ctx.isLogin = async () => {
        const sessionId = ctx.session.userId;
        if (!sessionId) {
          ctx.rest(null, -1, '未登录')
          return false;
        }
        return true
      };
      await next();
    }
  },
};