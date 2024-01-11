let env=process.env.NODE_ENV;
if(env === undefined){
    env=".env";
}else{
    env=env+".env";
}
require('dotenv').config({path: env});