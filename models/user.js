module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

            }
        },
        //need to figure out how datatype links in with passport.js
        //http://www.passportjs.org/
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {

            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {

            }
        },
    });
    return User;
};