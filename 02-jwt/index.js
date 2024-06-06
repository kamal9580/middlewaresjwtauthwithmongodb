const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';





const emailscema=zod.string().email();
const passwordschema=zod.string().min(6);

function signJwt(username, password) {
    // Your code here
    const usernameresponse=emailscema.safeParse(username);
    const passwordresponse=password.safeParse(password);
    if(!usernameresponse.success || !passwordresponse.success){
        return null;
    }

    const signature=jwt.sign({username},jwtPassword);

}


function verifyJwt(token) {
    // Your code here

    const ans=true;
    try{
        jwt.verify(token,jwtPassword);
    }
    catch(e){
        ans=false;
    }

    return ans;
}


function decodeJwt(token) {
   
    const decoded=jwt.decode(token);
    if(decoded)
    {
        return true;
    }

    else{
        return false;
    }
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
