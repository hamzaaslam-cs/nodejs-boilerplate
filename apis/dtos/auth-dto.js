module.exports = (data, extras = {}) => {
    let obj = {
        'id': data.id,
        'name': data.name,
        'email': data.email,
        'access_token': data.access_token,
        'refresh_token': data.refresh_token,
    };
    return {...obj, ...extras}
};