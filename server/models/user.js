'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: 'USERNAME_ALREADY_USING'
                },
                //validation will be executed right before inserting data to db.
                validate: {
                    isAlphanumeric: {
                        msg: 'USERNAME_INVALID'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },
            deletedAt: {
                type: DataTypes.DATE
            }
        },
        {
            paranoid: true,
            freezeTableName: true
        }
    );
    User.associate = (models) => {
        User.hasMany(models.Group, {
            foreignKey: 'authorId'
        });
    };
    return User;
};