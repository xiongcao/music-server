const db = require('../db/db');

module.exports = db.defineModel('song_sheet_mapping', {
  // 歌曲编号
  songId: {
    type: db.BIGINT,
    field: 'song_id'
  },
  // 歌单编号
  sheetId: {
    type: db.BIGINT,
    field: 'sheet_id'
  }
})