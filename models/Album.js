const db = require('../db/db');

module.exports = db.defineModel('album', {
  // 专辑编号
  albumId: {
    type: db.INTEGER(11),
    unique: true
  },
  // 歌手编号
  singerId: db.INTEGER(11),
  // 专辑名
  name: db.STRING(100),
  // 图片路径
  picUrl: {
    type: db.STRING(100),
    allowNull: true,
    field: 'pic_url'
  },
  // 简介
  brief: {
    type: db.TEXT,
    allowNull: true
  },
  // 播放次数
  playCount: {
    type: db.INTEGER(11),
    defaultValue: 0,
    field: 'play_count'
  },
  // 分享次数
  shareCount: {
    type: db.INTEGER(11),
    defaultValue: 0,
    field: 'share_count'
  },
  // 发布时间
  publishTime: {
    type: db.BIGINT,
    allowNull: true
  },
  // 版本
  subType: {
    type: db.STRING(100),
    allowNull: true
  },
  // 公司
  company: {
    type: db.STRING(100),
    allowNull: true
  },
  type: {
    type: db.STRING(100),
    allowNull: true
  },
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：下架，1：正常，-1：删除
  }
})