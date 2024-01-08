const BaseError = require("../../errors/BaseError");
const {logger} = require("../../utils/logger");
const {StatusCodes} = require('http-status-codes')
const {getUserDetail,getUsers} = require('../../services/user-service');
const userDto=require('../dtos/user-dto');
const usersDto=require('../dtos/users-dto');

const find = async (req, res,next) => {
    try {
        let data = await getUserDetail(req.params.id);
        return res.status(StatusCodes.OK).send(getObjectResponse(true, "Data found successfully", userDto(data)));
    } catch (e) {
        next(e);
    }
};

const index = async (req, res,next) => {
    try {
        let data = await getUsers();
        if(empty(data)){
            return res.status(StatusCodes.OK).send(getArrayResponse(false, "Records not found", []));
        }
        return res.status(StatusCodes.OK).send(getArrayResponse(true, "Records found successfully", usersDto(data)));
    } catch (e) {
        next(e);
    }
};


module.exports = {find,index}