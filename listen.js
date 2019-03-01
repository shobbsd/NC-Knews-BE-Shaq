const app = require('./app');

const { PORT = 9090 } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}...`);
});
