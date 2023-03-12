const errorHandler = (err, req, res, next) => {
    res.status(500).render('WentWrong/WentWrong', { error: err });
}

module.exports = errorHandler;