const db = require('../db/db');

module.exports = db.defineModel('singertype', {
  // 类型名称
  pid: db.STRING(50),
  // 类型名称
  name: db.STRING(50),
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 1：正常，0：删除
  }
})