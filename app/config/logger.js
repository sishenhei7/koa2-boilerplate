import path from 'path'

// 日志根目录
const baseLogPath = path.resolve(__dirname, '../../logs')

// 错误日志目录
const errorPath = '/error'
// 错误日志文件名
const errorFileName = 'error'
// 错误日志输出完整路径
const errorLogPath = `${baseLogPath + errorPath}/${errorFileName}`

// 响应日志目录
const responsePath = '/response'
// 响应日志文件名
const responseFileName = 'response'
// 响应日志输出完整路径
const responseLogPath = `${baseLogPath + responsePath}/${responseFileName}`

const logger = {
  appenders: {
    responseLogger: {
      type: 'dateFile', // 日志类型
      filename: responseLogPath, // 日志输出位置
      alwaysIncludePattern: true, // 是否总是有后缀名
      pattern: '-yyyy-MM-dd.log', // 后缀，每小时创建一个新的日志文件
      path: responsePath, // 错误日志的根目录(自定义属性!!!)
    },
    errorLogger: {
      type: 'dateFile',
      filename: errorLogPath,
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd.log',
      path: errorPath,
    },
  },
  categories: {
    errorLogger: { appenders: ['errorLogger'], level: 'error' },
    responseLogger: { appenders: ['responseLogger'], level: 'info' },
    default: { appenders: ['responseLogger', 'errorLogger'], level: 'info' },
  },
}

export default logger
