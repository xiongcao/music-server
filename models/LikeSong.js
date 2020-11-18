const db = require('../db/db');

module.exports = db.defineModel('like_song', {
  // 用户的ID
  userId:  {
    type: db.INTEGER(11),
    field: 'user_id'
  },
  // 喜欢的歌曲ID
  songId: {
    type: db.INTEGER(11),
    field: 'song_id'
  },
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：取消喜欢，1：喜欢，-1：删除
  }
})