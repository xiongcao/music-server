const db = require('../db/db');

module.exports = db.defineModel('singer_sheet_mapping', {
  // 用户编号
  singerId: {
    type: db.BIGINT,
    field: 'singer_id'
  },
  // 歌单编号
  sheetId: {
    type: db.BIGINT,
    field: 'sheet_id'
  }
})