const app = require('./app');
const PORT = 3001;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`RUNNING PORT ${PORT}`);
});
