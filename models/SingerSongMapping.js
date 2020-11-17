const db = require('../db/db');

module.exports = db.defineModel('singer_song_mapping', {
  // 歌曲编号
  songId: db.INTEGER(11),
  // 歌手编号
  singerId: db.INTEGER(11)
})