const allowedCors = [
  'https://olgatovstaya.mesto.nomoredomains.club',
  'http://olgatovstaya.mesto.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
