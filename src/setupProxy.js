const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/jwt',
    createProxyMiddleware({
      target: 'http://localhost:9090',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
  app.use(
    '/api/jwt/*',
    createProxyMiddleware({
      target: 'http://localhost:9090',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
  app.use(
    '/api/user',
    createProxyMiddleware({
      target: 'http://localhost:9090',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
  app.use(
    '/api/user/*',
    createProxyMiddleware({
      target: 'http://localhost:9090',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
  app.use(
    '/api/scraps',
    createProxyMiddleware({
      target: 'http://localhost:9091',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
  app.use(
    '/api/scraps/*',
    createProxyMiddleware({
      target: 'http://localhost:9091',
      changeOrigin: true,
      logLevel: 'debug'
    })
  );
};