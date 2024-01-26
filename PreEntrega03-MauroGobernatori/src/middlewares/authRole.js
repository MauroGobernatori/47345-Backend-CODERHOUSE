export const authRoleAdmin = (req, res, next) => {
    if(req.user.role == 'admin'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only admins can manipulate products' })
    }
}

export const authRoleUser = (req, res, next) => {
    if(req.user.role == 'user'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only users can manipulate carts' })
    }
}