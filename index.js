const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
const port = 3000;

const client = redis.createClient();

// Middleware to parse URL encoded data
app.use(bodyParser.json());

app.post('/addviewer', (req, res) => {
  const username = req.body.key;
  console.log(username)
  client.set(username, 'viewer', (err, reply) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error storing data in Redis\n');
    } else {
      console.log(reply);
      res.send('Data stored in Redis successfully\n');
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
