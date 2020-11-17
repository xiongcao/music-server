const db = require('../db/db');

module.exports = db.defineModel('tag_sheet_mapping', {
  // 标签编号
  tagId: db.INTEGER(11),
  // 歌单编号
  sheetId: db.INTEGER(11)
})