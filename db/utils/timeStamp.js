const timeStamp = data => data.map(element => (element.created_at = Date()));

module.exports = timeStamp;
