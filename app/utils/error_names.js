/**
 * API错误名称
 */
const errorNames = {};

errorNames.UNKNOW_ERROR = 'unknowError';
errorNames.INVALID_ARGUMENT = 'invalidArgument';
errorNames.USER_NOT_EXIST = 'userNotExist';
errorNames.USER_IS_EXISTED = 'userIsExisted';

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(errorNames.UNKNOW_ERROR, {
  code: 500,
  message: '未知错误'
});
errorMap.set(errorNames.INVALID_ARGUMENT, {
  code: 400,
  message: '参数不合法'
});
errorMap.set(errorNames.ARGUMENT_IS_NULL, {
  code: -1,
  message: '用户不存在'
});
errorMap.set(errorNames.USER_IS_EXISTED, {
  code: -1,
  message: '用户已存在'
});

// 根据错误名称获取错误信息
errorNames.getErrorInfo = (errorName) => {
  let errorInfo;

  if (errorName) {
    errorInfo = errorMap.get(errorName);
  }

  // 如果没有对应的错误信息，默认'未知错误'
  if (!errorInfo) {
    errorName = errorNames.UNKNOW_ERROR;
    errorInfo = errorMap.get(errorName);
  }

  return errorInfo;
}

export default errorNames;
