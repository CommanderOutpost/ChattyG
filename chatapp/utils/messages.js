const moment = require('moment');

function formatMessage(username, text, sentiment, messageId) {
  return {
    username,
    text,
    sentiment,
    messageId,
    time: moment().format('h:mm a')
  };
}

function generateUniqueId() {
  const timestamp = new Date().getTime().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 5);

  return timestamp + randomPart;
}

module.exports = { formatMessage, generateUniqueId };
