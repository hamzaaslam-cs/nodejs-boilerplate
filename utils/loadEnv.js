let env=process.env.NODE_ENV;
if(env == undefined){
    env=".env";
}
require('dotenv').config({path: env});