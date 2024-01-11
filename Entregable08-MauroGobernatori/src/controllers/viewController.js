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
};

export const logout = (req, res) => {
    res.render('logout');
}

export const current = (req, res) => {
    res.render('current', { ...req.user });
}