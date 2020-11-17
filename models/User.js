const { DataTypes, defineModel } = require('../db/db');

// 仔细思索一下，发现与歌手表冗余了，此表暂时用不上
module.exports = defineModel('user', {
  // 用户名
  name: {
    type: DataTypes.STRING(100),
    unique: true
  },
  // 密码
  password: DataTypes.STRING(100),
  // 手机号
  phoneNumber: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'phone_number'
  },
  // 昵称
  nickname: DataTypes.STRING(100),
  // 头像
  avatar: DataTypes.STRING(100),
  // 介绍
  signature: DataTypes.STRING,
  // 邮箱
  email: DataTypes.STRING(50),
  // 性别
  gender: {
    type: DataTypes.INTEGER(11),
    defaultValue: 2 // 0: 难，1：女，2：保密
  },
  // 生日
  brithday: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  // 省份
  province: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  // 城市
  city: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  // 区县
  area: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  // 详细地址
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // 状态
  status: {
    type: DataTypes.INTEGER(11),
    defaultValue: 1 // 0：违规，1：正常，-1：已注销
  }
});