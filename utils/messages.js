const moment = require('moment');

//the whole function is returning a message that embodies username, text and time
const formatMessage = (username, text) => {
    return {
        username: username,
        text: text,
        time: moment().format('h:mm a')
    };
};

module.exports = formatMessage;