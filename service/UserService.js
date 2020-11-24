const model = require('../db/model');

const { Singer } = model;

module.exports = {
  /**
   * @description 分页查询所有用户信息
   * @page 页码
   * @size 每页条数
   * @orderFileds 排序字段
   * @orderRules 排序规则
   */
  findUserAllPages: async ({ page = 0, size = 20, orderFileds = 'createdAt', orderRules = 'ASC' }) => {
    return await Singer.findAll({
      limit: size,
      offset: page * size,
      order: [
        [orderFileds, orderRules]
      ]
    });
  },

  /**
   * @description 查询用户总数
   */
  findUserAllCount: async () => {
    return await Singer.count();
  },

  /**
   * @description 根据用户名和密码查询用户信息
   * @name 用户名
   * @password 密码
   */
  findUserByNameAndPassword: async (name, password) => {
    return await Singer.findOne({
      where: { name, password }
    });
  },

  /**
   * @description 根据手机号和密码查询用户信息
   * @phoneNumber 手机号
   * @password 密码
   */
  findUserByPhoneAndPassword: async (phoneNumber, password) => {
    return await Singer.findOne({
      where: { phoneNumber, password }
    });
  },

  /**
   * @description 根据用户名查询用户信息
   * @name 用户名
   */
  findUserByName: async (name) => {
    return await Singer.findOne({
      where: { name }
    });
  },
  
  /**
   * @description 根据手机号查询用户信息
   * @phoneNumber 手机号
   */
  findUserByPhoneNumber: async (phoneNumber) => {
    return await Singer.findOne({
      where: { phoneNumber }
    });
  },

  /**
   * @description 保存用户信息
   * @user 用户实体对象
   */
  createUser: async (user) => {
    return await Singer.create(user);
  },

  /**
   * @description 根据ID查询用户信息
   * @id 用户ID
   */
  findUserById: async (id) => {
    return await Singer.findOne({
      where: { id }
    });
  },

  /**
   * @description 根据ID删除用户信息
   * @id 用户ID
   */
  deleteUserById: async (id) => {
    return await Singer.update({ status: -1 }, {
      where: { id }
    });
  },
  
  /**
   * @description 根据ID删除用户信息，不使用该接口
   * @id 用户ID
   */
  destroyUserById: async (id) => {
    return await Singer.destroy({ where: { id } });
  }
}