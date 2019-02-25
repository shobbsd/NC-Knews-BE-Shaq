const timeStamp = (data) => {
  const formatted = [];
  data.forEach((element) => {
    const formatTime = new Date(element.created_at);
    element.created_at = formatTime.toLocaleString();
    formatted.push(element);
  });
  return formatted;
};

module.exports = timeStamp;
