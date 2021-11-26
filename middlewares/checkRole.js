const checkRole = async (roles) => {
    try {
        if(roles.include(req.user.role)){
            next()
        }
        return res.status(401).json('Unauthorization')
    } catch (error) {
        next(error)
    }
}