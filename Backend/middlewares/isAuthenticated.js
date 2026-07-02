import jwt from 'jsonwebtoken';

const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            });
        }

        const decodedtoken = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decodedtoken){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            });
        }

        req.id = decodedtoken.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
}

export {isAuthenticated};