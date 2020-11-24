const model = require('../db/model');
const { Op } = require('sequelize');

const { Song } = model;

module.exports = {
  /**
   * @description 查询所有歌曲
   */
  findAll: async () => {
    return await Song.findAll();
  },
  
  /**
   * @description 根据专辑ID查询所有歌曲信息
   * @albumId 专辑ID
   */
  findAllSongByAlbumId: async (albumId) => {
    return await Song.findAll({
      where: { albumId }
    });
  }
}