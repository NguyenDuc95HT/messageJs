module.exports = {
    up: function (queryInterface, DataTypes) {
        return queryInterface.createTable('User', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true

            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    max: 25,
                    min: 10
                }
            },
            address: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: true
            },
            isActive: {
               type: DataTypes.BOOLEAN,
               defaultValue: true
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
        return queryInterface.dropTable('User');
    }
};