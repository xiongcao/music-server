const model = require('../db/model');

const { Singer } = model;

module.exports = { 
  /**
   * @description 根据用户名和密码查询用户信息
   * @name 用户名
   * @password 密码
   */
  findUserByNameAndPassword: async (name, password) => {
    return await Singer.findOne({
      where: { name, password }
    });
  }
}