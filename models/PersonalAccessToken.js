const {DataTypes} = require('sequelize');
const sequelize = require("../providers/database-provider");

const PersonalAccessToken = sequelize.define('PersonalAccessToken', {
    // Model attributes are defined here
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
}, {
    timestamps: true,
    tableName: 'personal_access_token',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});


module.exports = PersonalAccessToken;

const User = require('./User');

// Define the belongsTo relationship
PersonalAccessToken.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});