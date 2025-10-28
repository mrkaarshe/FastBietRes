import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({success: false, message: "not authorized login first"});
    }
    try {
       const TokenDecode =  jwt.verify(token,process.env.JWT_SECRET)   
       if(TokenDecode.id){
        req.body.userId = TokenDecode.id;
       }else{
        return res.status(401).json({success: false, message: "not authorized login first"});
       }
       next();
    
    } catch (error) {
    
        res.status(401).json({success: false, message: "not authorized login first"});
    }
}

export default userAuth;