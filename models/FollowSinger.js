const db = require('../db/db');

module.exports = db.defineModel('follow_singer', {
  // 关注用户的ID
  userId: db.INTEGER(11),
  // 被关注歌手的ID
  singerId: db.INTEGER(11),
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：删除，1：关注，2：粉丝
  }
})