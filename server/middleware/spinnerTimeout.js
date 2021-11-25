function spinnerTimeout(req, res, next) {
    setTimeout(() => {
      next();
    }, 1000);
}

module.exports = spinnerTimeout;
