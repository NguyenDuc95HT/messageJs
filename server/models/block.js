'use strict';
module.exports = (sequelize, DataTypes) => {
    const Block = sequelize.define('Block',
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
                    model: 'User',
                    key: 'id'
                },
            },
            groupId: {
                type: DataTypes.UUID,
                references: {
                    model: 'Group',
                    key: 'id'
                },
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                    model: 'User',
                    key: 'id'
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
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
            paranoid: true, // soft delete
            freezeTableName: true,
            classMethods: {
                generateHash(password) {
                    return BCrypt
                        .hash(password, 8)
                        .then((data) => {
                            return data;
                        })
                        .catch(() => {
                            return false;
                        });
                }
            }
        }
    );
    Block.associate = (models) => {
        Block.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
        Block.belongsTo(models.Group, {
            foreignKey: 'groupId',
            onDelete: 'CASCADE'
        });
        Block.belongsTo(models.User, {
            foreignKey: 'authorId',
            onDelete: 'CASCADE'
        });

    };
    return Block;
};