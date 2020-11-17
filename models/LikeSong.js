const db = require('../db/db');

module.exports = db.defineModel('like_song', {
  // 用户的ID
  userId: db.INTEGER(11),
  // 喜欢的歌曲ID
  songId: db.INTEGER(11),
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：取消喜欢，1：喜欢，-1：删除
  }
})