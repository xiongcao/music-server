const db = require('../db/db');

module.exports = db.defineModel('singer', {
  // 歌手编号（歌手即用户）
  singerId: {
    type: db.BIGINT,
    unique: true,
    field: 'singer_id'
  },
  // 用户名
  name: {
    type: db.STRING(100),
    unique: true
  },
  // 密码
  password: db.STRING(100),
  // 手机号
  phoneNumber: {
    type: db.STRING(50),
    allowNull: true,
    field: 'phone_number'
  },
  // 昵称
  nickname: db.STRING(100),
  // 等级
  level: {
    type: db.INTEGER(11),
    defaultValue: 1,
  },
  // 头像
  picUrl: {
    type: db.STRING(100),
    allowNull: true,
    field: 'pic_url'
  },
  // 别称
  alias: {
    type: db.STRING(100),
    allowNull: true
  },
  // 歌曲数量
  musicCount: {
    type: db.INTEGER(11),
    defaultValue: 0,
    field: 'music_count'
  },
  // mv数量
  mvCount: {
    type: db.INTEGER(11),
    defaultValue: 0,
    field: 'mv_count'
  },
  // 专辑数量
  albumCount: {
    type: db.INTEGER(11),
    defaultValue: 0,
    field: 'album_count'
  },
  // 简介
  brief: {
    type: db.TEXT,
    allowNull: true
  },
  // 邮箱
  email: db.STRING(50),
  // 性别
  gender: {
    type: db.INTEGER(11),
    defaultValue: 2 // 0: 难，1：女，2：保密
  },
  // 生日
  birthday: {
    type: db.STRING(50),
    allowNull: true
  },
  // 国家/地区
  country: {
    type: db.STRING(50),
    allowNull: true
  },
  // 省份
  province: {
    type: db.STRING(50),
    allowNull: true
  },
  // 城市
  city: {
    type: db.STRING(50),
    allowNull: true
  },
  // 区县
  area: {
    type: db.STRING(50),
    allowNull: true
  },
  // 详细地址
  address: {
    type: db.STRING,
    allowNull: true
  },
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：下架，1：正常，-1：删除
  }
})