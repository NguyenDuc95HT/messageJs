module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable('MemberGroup', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true

            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'User'
                }
            },
            groupId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    key: 'id',
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
                allowNull: false
            },
            deletedAt: {
                type: DataTypes.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('MemberGroup');
    }
};
// create mew migration file for insert column, update column properties, remove column.