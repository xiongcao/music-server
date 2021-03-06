const db = require('../db/db');

module.exports = db.defineModel('tag_sheet_mapping', {
  // 标签编号
  tagId: {
    type: db.BIGINT,
    field: 'tag_id'
  },
  // 歌单编号
  sheetId: {
    type: db.BIGINT,
    field: 'sheet_id'
  }
})