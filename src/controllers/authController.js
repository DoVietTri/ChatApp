let getLoginRegister =  (req, res) => {
    res.render('auth/loginRegister');
};

module.exports = {
    getLoginRegister: getLoginRegister
};
