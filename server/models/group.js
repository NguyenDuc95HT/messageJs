'use strict';

module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            authorId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'User'
                }
            },
            type: {
                type: DataTypes.STRING,
            },
            avatar: {
                type: DataTypes.STRING,
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
            paranoid: true, // soft delete 
            freezeTableName: true,
        }
    );

    Group.associate = (models) => {
        Group.belongsTo(models.User, {
            foreignKey: 'authorId',
            onDelete: 'CASCADE'
        });
    };
    return Group;
};