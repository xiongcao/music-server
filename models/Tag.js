const db = require('../db/db');

module.exports = db.defineModel('tag', {
  // 类型ID
  typeId: db.INTEGER(11),
  // 标签名称
  name: db.STRING(50),
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 1：正常，0：删除
  }
})