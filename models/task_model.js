const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        title: {
            type: Sequelize.STRING
        },
        course: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        meeting: {
            type: Sequelize.STRING
        },
        deadlineDate: {
            type: Sequelize.DATEONLY
        },
        deadlineTime: {
            type: Sequelize.TIME
        },
        doingBy: {
            type: Sequelize.STRING
        },
        media: {
            type: Sequelize.STRING
        },
        isDone: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return Task;
};