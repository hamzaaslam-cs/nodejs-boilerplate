const userDto=require('../dtos/user-dto');
module.exports = (data, extras = {}) => {
    return data.map((value)=> {
        return userDto(value)
    })
};