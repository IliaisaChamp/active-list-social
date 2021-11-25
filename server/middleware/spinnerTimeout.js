function spinnerTimeout(req, res, next) {
  console.log(req.url);
  if (req.url.toString().includes('/like') || req.url.toString().includes('/comment')) {
    next();
  } else {
    setTimeout(() => {
      next();
    }, 1000);
  }
}

module.exports = spinnerTimeout;
