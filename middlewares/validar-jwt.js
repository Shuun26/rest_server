const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req = request, res = response, next) => {
    const token = req.header("x-token");
    /* console.log(token); */
    if (!token) {
        return res.status(401).json({
            msg: "No existe el token",
        })
    }
    try {
        jwt.verify(token, "M1T0k3NS3cr3t0Mu4k");
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token no valido",
        });
    }

}

module.exports = {
    validarJWT,
}