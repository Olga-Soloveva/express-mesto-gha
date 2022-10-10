const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const SERVER_ERROR_CODE = 500;
const REGEX = /^(https?:\/\/)(w{3}\.)?([\w\-._~:/?#[\]@!$&'()*+,;=]+)(#?)$/;

module.exports = {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  UNAUTHORIZED,
  FORBIDDEN,
  CONFLICT_CODE,
  REGEX,
};
