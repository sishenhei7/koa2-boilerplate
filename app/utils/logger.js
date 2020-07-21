const fs = require('fs')
const log4js = require('log4js')
const logConfig = require('../config/logger')

// 加载配置文件
log4js.configure(logConfig)

const logUtil = {}
const errorLogger = log4js.getLogger('errorLogger')
const responseLogger = log4js.getLogger('responseLogger')

// 封装错误日志
logUtil.logError = (ctx, error, responseTime) => {
  if (ctx && error) {
    errorLogger.error(formatError(ctx, error, responseTime))
  }
}

// 封装响应日志
logUtil.logResponse = (ctx, responseTime) => {
  if (ctx) {
    responseLogger.info(formatResponse(ctx, responseTime))
  }
}

// 格式化响应日志
function formatResponse(ctx, responseTime) {
  let logText = ''

  // 响应日志开始
  logText += '\n*************** response log start ***************\n'

  // 添加请求日志
  logText += formatRequestLog(ctx.request, responseTime)

  // 响应状态码
  logText += `response status: ${ctx.status}\n`

  // 响应内容
  logText += `response body: \n${JSON.stringify(ctx.body)}\n`

  // 响应日志结束
  logText += '*************** response log end ***************\n'

  return logText
}

// 格式化错误日志
function formatError(ctx, err, responseTime) {
  let logText = ''

  // 错误信息开始
  logText += '\n*************** error log start ***************\n'

  // 添加请求日志
  logText += formatRequestLog(ctx.request, responseTime)

  // 错误名称
  logText += `err name: ${err.name}\n`
  // 错误信息
  logText += `err message: ${err.message}\n`
  // 错误详情
  logText += `err stack: ${err.stack}\n`

  // 错误信息结束
  logText += '*************** error log end ***************\n'

  return logText
}

// 格式化请求日志
function formatRequestLog(request, responseTime) {
  let logText = ''
  const { method } = request

  // 访问方法
  logText += `request method: ${method}\n`

  // 请求原始地址
  logText += `request originalUrl:  ${request.originalUrl}\n`

  // 客户端ip
  logText += `request client ip:  ${request.ip}\n`

  // 请求参数
  if (method === 'GET') {
    logText += `request query:  ${JSON.stringify(request.query)}\n`
  } else {
    logText += `request body: \n${JSON.stringify(request.body)}\n`
  }

  // 服务器响应时间
  logText += `response time: ${responseTime}\n`

  return logText
}

// 确定目录是否存在，如果不存在则创建目录
const confirmPath = (pathString) => {
  if (!fs.existsSync(pathString)) {
    fs.mkdirSync(pathString)
    console.log(`createPath: ${pathString}`)
  }
}

// 初始化log相关目录
const initLogPath = () => {
  // 创建log的根目录'logs'
  if (logConfig.baseLogPath) {
    confirmPath(logConfig.baseLogPath)
    // 根据不同的logType创建不同的文件目录
    for (let i = 0, length = logConfig.appenders.length; i < length; i++) {
      if (logConfig.appenders[i].path) {
        confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path)
      }
    }
  }
}

exports.log4js = log4js
exports.initLogPath = initLogPath
