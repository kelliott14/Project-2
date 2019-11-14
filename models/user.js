/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your email'
                },
                isEmail: {
                    msg: "Username must be a valid email address"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [6, 50],
                    msg: "Password must be between 6 and 50 characters long"
                }
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return User;
};