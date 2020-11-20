const db = require('../db/db');

module.exports = db.defineModel('sheet', {
  // 歌单编号
  sheetId: {
    type: db.BIGINT,
    unique: true,
    field: 'sheet_id'
  },
  // 创建者ID
  userId:  {
    type: db.BIGINT,
    field: 'user_id'
  },
  // 歌单名
  name: db.STRING(100),
  // 图片路径
  picUrl: {
    type: db.STRING(100),
    allowNull: true,
    field: 'pic_url'
  },
  // 简介
  description: {
    type: db.TEXT,
    allowNull: true
  },
  // 播放次数
  playCount: {
    type: db.BIGINT,
    defaultValue: 0,
    field: 'play_count'
  },
  // 分享次数
  shareCount: {
    type: db.BIGINT,
    defaultValue: 0,
    field: 'share_count'
  },
  // 收藏次数
  collectionCount: {
    type: db.BIGINT,
    defaultValue: 0,
    field: 'collection_count'
  },
  // 类型
  type: {
    type: db.INTEGER(11),
    defaultValue: 0 // 0：歌单，1：榜单
  },
  // 排序
  rank: {
    type: db.INTEGER(11),
    defaultValue: 0 // 值越大越靠前
  },
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：下架，1：正常，-1：删除
  }
})