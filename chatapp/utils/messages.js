const moment = require('moment');

function formatMessage(username, text, sentiment) {
  return {
    username,
    text,
    sentiment,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
