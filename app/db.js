const Sequelize = require('sequelize')
const { db } = require('./config/settings')

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'mysql',
  define: {
    charset: 'utf8mb4', // 字符集
    freezeTableName: true, // 冻结表名 否则表名自动变成复数
    underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
  },
  dialectOptions: {
    charset: 'utf8mb4', // 字符集
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: true, // 操作时候显示原始的sql语句
  timezone: '+08:00', // 设置为北京时间
})

// 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......')
  })
  .catch((error) => {
    console.error('MYSQL 链接失败:', error)
  })

// 创建模型
sequelize.sync({
  force: false,
  alter: false, // 调试的时候可以开启这里
})

module.exports = sequelize
