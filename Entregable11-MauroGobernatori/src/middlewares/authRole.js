export const authRoleAdminPremium = (req, res, next) => {
    if(req.user.role == 'admin' || req.user.role == 'premium'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only admins or premiums can create products' })
    }
}

export const authRoleAdmin = (req, res, next) => {
    if(req.user.role == 'admin'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only admins can delete or update products' })
    }
}

export const authRoleUser = (req, res, next) => {
    if(req.user.role == 'user'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only users can manipulate carts' })
    }
}