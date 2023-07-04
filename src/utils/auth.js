const jwt = require("jsonwebtoken")


//middleware para authorizacion
module.exports = (req,res,next) => {
    const accessToken = req.headers["authorization"]

    if(!accessToken) return res.status(401).json({result : "Access denied"})

    try {
        const token = accessToken.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({result : "Access denied"})
    }
    
}