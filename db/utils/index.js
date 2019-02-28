exports.formatTimeStamp = (data) => {
  const formatted = [];
  data.forEach((element) => {
    const formatTime = new Date(element.created_at);
    element.created_at = formatTime.toLocaleString();
    formatted.push(element);
  });
  return formatted;
};

exports.createArticleRef = (data) => {
  const obj = {};
  data.forEach((element) => {
    obj[element.title] = element.article_id;
  });
  return obj;
};

exports.formatComment = (data, ref) => {
  const formatted = [];
  data.forEach((element) => {
    const tempObj = { ...element };
    tempObj.article_id = ref[element.belongs_to];
    delete tempObj.belongs_to;
    tempObj.author = element.created_by;
    delete tempObj.created_by;
    const formatTime = new Date(element.created_at);
    tempObj.created_at = formatTime.toLocaleString();
    formatted.push(tempObj);
  });
  return formatted;
};
