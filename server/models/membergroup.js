'use strict';
module.exports = (sequelize, DataTypes) => {
    const MemberGroup = sequelize.define('MemberGroup',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                    key: 'id',
                    model: 'User'
                }
            },
            groupId: {
                type: DataTypes.UUID,
                references: {
                    key: 'Id',
                    model: 'Group'
                }
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
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
    MemberGroup.associate = (models) => {
        MemberGroup.belongsTo(models.Group, {
            foreignKey: 'groupId',
            onDelete: 'CASCADE'
        });
        MemberGroup.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return MemberGroup;
};