const db = require('../db/db');

module.exports = db.defineModel('tag_sheet_mapping', {
  // 标签编号
  tagId: {
    type: db.INTEGER(11),
    field: 'tag_id'
  },
  // 歌单编号
  sheetId: {
    type: db.INTEGER(11),
    field: 'sheet_id'
  }
})