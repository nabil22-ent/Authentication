const express = require('express');
const app = express();

app.post('/signup', (req, res) => {
  res.semd('I am here SignUp');
});

app.listen(3000, () => {
  console.log(`Listeing from PORT 3000`);
});
