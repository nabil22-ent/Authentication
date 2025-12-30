const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = 'IAMLEARNINGAUTHENTICATION';

app.use(express.json());

const users = [];

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({ username, password });
  res.send({
    message: 'I I have signed UP',
  });
});

app.post('/signin', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    const token = jwt.sign(
      {
        username: user.username,
      },
      JWT_SECRET
    );

    res.send({
      token,
    });
    console.log(user);
  } else {
    res.status(403).send({
      message: 'Invalid Password or username ',
    });
  }
});

app.get('/me', (req, res) => {
  const token = req.headers.authorization;
  const userDetails = jwt.verify(token, JWT_SECRET);

  const username = userDetails.username;
  const user = users.find((user) => user.username === username);
  if (user) {
    res.send({
      username: user.username,
    });
  } else {
    res.status(401).send({
      message: 'Unauthorized',
    });
  }
});

app.listen(3000, () => {
  console.log(`Listeing from PORT 3000`);
});
