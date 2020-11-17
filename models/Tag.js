const db = require('../db/db');

module.exports = db.defineModel('tag', {
  // 类型ID
  categoryId: db.INTEGER(11),
  // 标签名称
  name: db.STRING(50),
  // 是否热门
  hot: db.BOOLEAN,
  activity: db.BOOLEAN,
  resourceCount: db.INTEGER,
  resourceType: db.INTEGER,
  type: db.INTEGER,
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 1：正常，0：删除
  }
})