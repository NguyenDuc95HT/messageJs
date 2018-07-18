module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable('Block', {
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
            groupId: {
                type: DataTypes.UUID,
                references: {
                    key: 'id',
                    model: 'Group'
                }
            },
            userId: {
                type: DataTypes.UUID,
                references: {
                    key: 'id',
                    model: 'User'
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
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Block');
    }
};
// create mew migration file for insert column, update column properties, remove column.