global.empty = (value) => {
    // check if value is null
    if (value === null) {
        return true;
    }
    // check if value is an object
    if (typeof value === "object") {
        // get the keys of the object
        let keys = Object.keys(value);
        // check if the object has no keys
        if (keys.length === 0) {
            return true;
        }
    }
    // check if value is an array
    if (Array.isArray(value)) {
        // check if the array has no elements
        if (value.length === 0) {
            return true;
        }
    }
    // check if value is a string
    if (typeof value === "string") {
        // check if the string is empty
        if (value.trim() === "") {
            return true;
        }
    }


    if (value === undefined) {
        return true;
    }
    // otherwise, return false
    return false;
}

global.getEmptyResponse = (success = true, message = "", data = null) => {
    return {success, message, data};
};

global.getObjectResponse = (success = true, message = "", data = {}) => {
    return {success, message, data};
};

global.getArrayResponse = (success = true, message = "", data = []) => {
    return {success, message, data};
};

global.getEmptyResponse = (status=false,message="") => {
    return {success: false, message: message, data: null};
};

global.getErrorResponse = (e,message="") => {
    if(empty(message)){
        message=e.message;
    }
    return {success: false, message: message, data: null};
};


global.env = (key, def = null) => {
    if (process.env.hasOwnProperty(key)) {
       return !empty(process.env[key]) ? process.env[key] : def;
    } else {
        return def;
    }
}

global.view = (name) => {
    return name;
}
