import express from 'express';

const app = express();

app.get('/users', (req, res, next) => {
  console.log('It works!');

  return res.json({ hello: 'world' });
});

app.listen(3333);
