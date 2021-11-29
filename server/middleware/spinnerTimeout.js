function spinnerTimeout(req, res, next) {
  if (
    req.url.toString().includes('/like')
    || req.url.toString().includes('/comment')
    || req.url.toString().includes('follow')
    || req.url.toString().includes('subscribe')
  ) {
    next();
  } else {
    setTimeout(() => {
      next();
    }, 1000);
  }
}

module.exports = spinnerTimeout;
