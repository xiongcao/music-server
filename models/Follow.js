const db = require('../db/db');

module.exports = db.defineModel('follow', {
  // 关注用户的ID
  userId:  {
    type: db.INTEGER(11),
    field: 'user_id'
  },
  // 被关注歌手的ID
  singerId: {
    type: db.INTEGER(11),
    field: 'singer_id'
  },
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：取消，1：正常，-1：删除
  }
})