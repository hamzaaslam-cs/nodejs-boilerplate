const {DataTypes} = require('sequelize');
const sequelize = require("../providers/database-provider");

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'users',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
});



module.exports = User;

const PersonalAccessToken = require('./PersonalAccessToken');

// // User hasMany Posts
User.hasMany(PersonalAccessToken, {
    foreignKey: 'user_id', // Foreign key in Post table
    as: 'tokens', // Alias for easier access
});