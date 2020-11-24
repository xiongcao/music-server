const model = require('../db/model');

const { Category, Tag } = model;

Category.hasMany(Tag, {
  foreignKey: 'categoryId',
  targetKey: 'id' // 默认id
});

module.exports = {
  /**
   * @description 查询所有分类及标签
   */
  findAllCategoryAndTag: async () => {
    return await Category.findAll({
      include: [
        {
          model: Tag, // 指定关联的model
        }
      ],
      raw: false // true: 开启原生查询，不需要转换成实例对象
    });
  }
}