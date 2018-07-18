'use strict';

module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message',
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
            },
            groupId: {
                type: DataTypes.UUID,
            },
            type: {
                type: DataTypes.STRING,
            },
            body: {
                type: DataTypes.JSON,
            },
            createdAt: {
                type: DataTypes.DATE
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
    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: 'authorId',
            onDelete: 'CASCADE'
        });
        Message.belongsTo(models.Group, {
            foreignKey: 'groupId',
            onDelete: 'CASCADE'
        });
    };
    return Message;
};