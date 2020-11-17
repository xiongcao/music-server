const Sequelize = require('sequelize');

const uuid = require('uuid');

const config = require('./config');

function generateId() {
  return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
  var attrs = {};

  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };

  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }

  /**
   * primaryKey： 主键；
   * unique： 唯一键
   * type：数据类型；
   * allowNull： true 允许为空，false 不允许为空；
   * autoIncrement：创建 auto_incrementing 整数列；
   * field：指定自定义列名称（数据库中字段名称）；
   * 
   * // 外键
   * references：{
   * 
   * // 这是对另一个模型的参考
   *  model: Bar,
   * 
   * // 这是引用模型的列名
   *  key: 'id',
   * }
   */

  
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        let now = Date.now();
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.createdAt = now;
          obj.updatedAt = now;
          obj.version = 0;
        } else {
          obj.updatedAt = now;
          obj.version++;
        }
      }
    }
  });
}

/**
 * STRING：  字符串，默认长度255；
 * TEXT：    长字符串；
 * BOOLEAN： 布尔；
 * INTEGER： 整型
 * BIGINT：  长整型，可传参
 * DOUBLE：  双精度浮点，可传参
 * DATEONLY：不带时区的Date(时间戳)
 */
const TYPES = ['STRING', 'TEXT', 'BOOLEAN', 'INTEGER', 'BIGINT', 'DOUBLE', 'DATEONLY'];

var exp = {
  defineModel: defineModel,
  sync: () => {
    if (process.env.NODE_ENV !== 'production') {
      // sequelize.sync({ force: true }); // 将创建表,如果表已经存在,则将其首先删除
      sequelize.sync(); // 创建该表(如果已经存在,则不执行任何操作)
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
    }
  }
};

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;
exp.sequelize = sequelize;

module.exports = exp;