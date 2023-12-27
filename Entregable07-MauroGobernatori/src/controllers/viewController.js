export const register = (req, res) => {
    res.render('register');
};

export const errorRegister = (req, res) => {
    res.render('errorRegister');
};

export const login = (req, res) => {
    res.render('login');
};

export const errorLogin = (req, res) => {
    res.render('errorLogin');
};

export const profile = (req, res) => {
    res.render('profile', { ...req.user });
    // console.log(req.session);
};

export const logout = (req, res) => {
    res.render('logout');
}