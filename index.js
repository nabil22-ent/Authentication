const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const JWT_SECRET = 'IAMLEARNINGAUTHENTICATION';

app.use(express.json());

const users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

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

// function auth(req, res, next) {
//   const token = req.headers.authorization;

//   if (token) {
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//       if (err) {
//         res.staus(401).send({
//           message: 'Unauthorized',
//         });
//       } else {
//         res.user = decoded;
//         next();
//       }
//     });
//   } else {
//     res.staus(401).send({
//       message: 'Unauthorized',
//     });
//   }
// }

// app.get('/me', auth, (req, res) => {
//   const user = req.user;
//   res.send({
//     username: user.username,
//   });
// });
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: 'Unauthorized',
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: 'Unauthorized',
    });
  }
}

app.get('/me', auth, (req, res) => {
  const user = req.user;

  res.send({
    username: user.username,
  });
});

app.listen(3000, () => {
  console.log(`Listeing from PORT 3000`);
});
