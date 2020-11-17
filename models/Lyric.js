const db = require('../db/db');

module.exports = db.defineModel('lyric', {
  // 歌词
  content: db.TEXT,
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：下架，1：正常，-1：删除
  }
})