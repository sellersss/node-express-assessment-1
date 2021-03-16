const express = require('express');
const app = express();
const axios = require('axios');
const ExpressError = require('./utils/expressError')

app.use(express.json());

/** POST: Get GitHub username bio and name */
app.post('/', function(req, res) {
  if (!req.body.developers) throw new ExpressError('A GitHub username is required.', 400);
  const devInfo = req.body.developers.map(async (dev) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${dev}`);
      if (res.status !== 404) {
        return {
          bio: res.data.bio,
          name: res.data.name,
        };
      }
    } catch {
      return { message: "There is no such user!" };
    }
  });
  Promise.all(devInfo).then((data) => {
    return res.status(200).json(data);
  })
});

/** 404 not found handler */
app.use((req, res, next) => {
  const error = new ExpressError('404 Not Found', 404);
  return next(error);
})

/** Error handler */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app
