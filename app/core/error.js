/**
 * 自定义Api异常
 */
const errorMap = {
  // CONTINUE: {
  //   code: 100,
  //   message: '请求成功，临时响应'
  // },
  // OK: {
  //   code: 200,
  //   message: '请求成功'
  // },
  // CREATED: {
  //   code: 201,
  //   message: '请求成功，并且创建的资源'
  // },
  // ACCEPTED: {
  //   code: 202,
  //   message: '请求已收到，但还没响应'
  // },
  // NO_CONTENT: {
  //   code: 204,
  //   message: '请求成功，但是页面不需要跳转'
  // },
  BAD_REQUEST: {
    code: 400,
    message: '请求失败，语义有误或参数有误'
  },
  UNAUTHORIZED: {
    code: 401,
    message: '需要授权'
  },
  FORBIDDEN: {
    code: 403,
    message: '服务器拒绝执行'
  },
  NOT_FOUND: {
    code: 404,
    message: '请求失败，未发现资源'
  },
  NOT_ACCEPTABLE: {
    code: 406,
    message: '请求条件无法满足'
  },
  REQUEST_TIMEOUT: {
    code: 408,
    message: '请求超时'
  },
  CONFLICT: {
    code: 409,
    message: '请求存在冲突'
  },
  REQUEST_ENTITY_TOO_LARGE: {
    code: 413,
    message: '请求头数据量太大'
  },
  UNSUPPORTED_MEDIA_TYPE: {
    code: 415,
    message: '请求格式不正确'
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    message: '语义错误'
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    message: '请求过多'
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: '服务器错误'
  },
  NOT_IMPLEMENTED: {
    code: 501,
    message: '请求方法不被支持'
  },
  BAD_GATEWAY: {
    code: 502,
    message: '网关错误'
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: '服务器不可用'
  },
  GATEWAY_TIMEOUT: {
    code: 504,
    message: '网关超时'
  },
};

class ApiError extends Error {
  // 构造方法
  constructor(errorName) {
    super();

    const errorInfo = errorMap[errorName];

    if (errorInfo) {
      this.name = errorName;
      this.code = errorInfo.code;
      this.message = errorInfo.message;
    } else {
      this.name = errorName;
      this.code = -1;
      this.message = errorName;
    }
  }
}

export default ApiError;
