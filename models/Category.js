const db = require('../db/db');

module.exports = db.defineModel('category', {
  // 类型 0：语种，1：风格，2：场景，3：情感，4：主题
  name: {
    type: db.STRING(100),
    unique: true
  },
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 1：正常，0：删除
  }
})