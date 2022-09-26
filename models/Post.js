const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init
(
    {
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        submit_date: 
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        message:
        {
            type: DataTypes.TEXT,
            allowNull: false
        },
        poster_id:
        {
            type: DataTypes.INTEGER,
            references:
            {
                model: 'gallery',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;