module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable('Message', {
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
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'Group'
                }
            },
            type: {
              type: DataTypes.STRING,
            },
            body: {
              type: DataTypes.JSON,
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
        return queryInterface.dropTable('Message');
    }
};
// create mew migration file for insert column, update column properties, remove column.