'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Your name is required!`
        },
        notEmpty: {
          args: true,
          msg: `Name must be filled!`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: `Your Email is required!`
        },
        notEmpty: {
          args: true,
          msg: `Email must be filled!`
        },
        isEmail: {
          args: true,
          msg: `Email must be in format 'yourname@example.com'`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Your Password is required!`
        },
        notEmpty: {
          args: true,
          msg: `Password must be filled!`
        }
      }
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Check Before Create hooks to fill.`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.organization = `Hacktiv8`
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};