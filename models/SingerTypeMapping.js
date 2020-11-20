const db = require('../db/db');

module.exports = db.defineModel('singer_type_mapping', {
  // 类型编号
  typeId: {
    type: db.STRING(50),
    field: 'type_id'
  },
  // 歌手编号
  singerId: {
    type: db.BIGINT,
    field: 'singer_id'
  }
})