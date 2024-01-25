import ViewService from "../services/viewService.js";
const viewService = new ViewService();

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

export const products = async (req, res) => {
    const products = await viewService.getAllProducts();
    if(req.user.role=='admin'){
        res.render('products', { ...req.user, products: products, admin: true });
    }else{
        res.render('products', { ...req.user, products: products, admin: false });
    }
}

export const current = (req, res) => {
    res.render('current', { ...req.user });
}

export const productUpdate = async (req, res) => {
    const { id } = req.params
    const prod = await viewService.getProductById(id);
    res.render('product_update', { ...prod});
}