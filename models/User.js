const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model
{
    check_password(given_password)
    {
        return bcrypt.compareSync(given_password, this.password);
    }
}

User.init
(
    {
        id:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: 
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { len: [8] }
        }
    },
    {
        hooks:
        {
            async beforeCreate(new_user_data)
            {
                new_user_data.password = await bcrypt.hash(new_user_data.password, 10);
                return new_user_data;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;