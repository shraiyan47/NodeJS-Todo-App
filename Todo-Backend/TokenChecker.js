const jwt = require("jsonwebtoken");

function TokenChecker(AuthToken) {
    try {
        if(!!AuthToken){
        console.log("Check Token -> ", AuthToken);
    
        const token = AuthToken.split(' ')[1];
        console.log("Check Split Token -> ", token);
    
        //Authorization: 'Bearer TOKEN'
        if (!token) {
            return res.status(401).json({
                success: false, message: "Error! Token was not provided."
            });
        }
        else {
            //Decoding the token
            return jwt.verify(token, process.env.JWT_SECRET_KEY,{algorithms:"HS256"});
        }}
        else
        {
            console.log("Check Token -> ", AuthToken);
            return res.status(406).json({"ErrorMsg":"Undifined AuthToken"})
        }
    } catch (error) {
        return res.status(500).json({"Catch Error": error , "Error Msg": "Auth Token Error!!"})
    }

}

module.exports = { TokenChecker }