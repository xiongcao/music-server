const db = require('../db/db');

module.exports = db.defineModel('singer_song_mapping', {
  // 歌曲编号
  songId: {
    type: db.BIGINT,
    field: 'song_id'
  },
  // 歌手编号
  singerId: {
    type: db.BIGINT,
    field: 'singer_id'
  }
})