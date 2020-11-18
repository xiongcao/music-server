const db = require('../db/db');

module.exports = db.defineModel('song', {
  // 歌曲编号
  songId: {
    type: db.INTEGER(11),
    unique: true,
    field: 'song_id'
  },
  // 歌曲名
  name: db.STRING(100),
  // 图片路径
  picUrl: {
    type: db.STRING(100),
    allowNull: true,
    field: 'pic_url'
  },
  // 专辑ID
  albumId: {
    type: db.INTEGER(11),
    allowNull: true,
    field: 'album_id'
  },
  // mvID
  mvId: {
    type: db.INTEGER(11),
    allowNull: true,
    field: 'mv_id'
  },
  // 歌词ID
  lyricId: {
    type: db.INTEGER(11),
    allowNull: true,
    field: 'lyric_id'
  },
  // 是否vip
  vip: {
    type: db.INTEGER(11),
    defaultValue: 0 // 0：非vip，1：vip
  },
  // 版权
  cr: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：无版权，1：有版权
  },
  // 播放次数
  playCount: {
    type: db.INTEGER(11),
    defaultValue: 0,
    field: 'play_count'
  },
  // 下载次数
  downloadCount: {
    type: db.INTEGER(11),
    defaultValue: 0,
    field: 'download_count'
  },
  // 状态
  status: {
    type: db.INTEGER(11),
    defaultValue: 1 // 0：下架，1：正常，-1：删除
  }
})