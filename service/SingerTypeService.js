const model = require('../db/model');
const { Op } = require('sequelize');

const { SingerType } = model;

module.exports = {
  /**
   * @description 查询所有歌手的分类
   */
  findAll: async () => {
    return await SingerType.findAll();
  },

  /**
   * @description 查询所有一级分类
   */
  findOneLevelAll: async () => {
    return await SingerType.findAll({
      where: {
        id: {
          [Op.lt]: 7 // < 7
        }
      }
    });
  },

  /**
   * @description 添加分类
   * @type 分类信息
   */
  create: async (type) => {
    return await SingerType.create(type);
  },

  /**
   * @description 根据ID查询分类信息
   * @id 分类ID
   */
  findTypeById: async (id) => {
    return await SingerType.findOne({
      where: {
        id
      }
    });
  },
  
  /**
   * @description 根据ID修改状态
   * @id 分类ID
   * @status 状态 1：正常，0：删除
   */
  updateStatusById: async (id, status) => {
    return await SingerType.update({ status },{
      where: {
        id
      }
    });
  }
}