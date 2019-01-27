const express = require('express');
const axios = require('axios');
const cors = require('cors');
const domStats = require('./dom-stats');
const app = express();

app.use(cors());

app.get('/:url', async (req, res) => {
  const url = req.params.url;
  try {
    const response = await axios.get(`http://${url}`);
    const html = response.data;
    res.json(domStats(html));
  } catch (e) {
    res.send('Error: ' + e);
  }
});

app.listen(3001);
console.log('listening on a nice port');
