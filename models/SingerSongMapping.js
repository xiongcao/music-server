const db = require('../db/db');

module.exports = db.defineModel('singer_song_mapping', {
  // 歌曲编号
  songId: {
    type: db.INTEGER(11),
    field: 'song_id'
  },
  // 歌手编号
  singerId: {
    type: db.INTEGER(11),
    field: 'singer_id'
  }
})