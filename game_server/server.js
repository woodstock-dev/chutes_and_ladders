const app = require('./app');

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// app.use(express.static(path.resolve(__dirname, '../chutes_and_ladders/chutes-and-ladders-web/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../chutes-and-ladders-web/dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('RUNNING 3000 BIA!!');
});
