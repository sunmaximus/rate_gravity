require('dotenv').config()
const express = require('express');
const axios = require('axios');
const app = express();
// For development only
const cors = require('cors');
const port = process.env.PORT || 4000;

const url = 'https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/ratequotes'
const axiosConfig = {
  headers: {
    'Authorization': `RG-AUTH ${process.env.API_KEY}`,
  }
};

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000' }));

app.get('/', (req, res) => res.send('rate_gravity_test'));
app.post('/ratequotes', async function(req, res) {
  const sendObject = {
    ...req.body,
    loanSize: parseInt(req.body.loanSize),
    creditScore: parseInt(req.body.creditScore),
  }
  try {
    const getRequestId = await axios.post(url, sendObject, axiosConfig)
    console.log(getRequestId.data);
    res.send(getRequestId.data)
  } catch (e) {
    console.error(e);
    res.send(e)
  }
});

app.get('/ratequotes/:id', async function(req, res) {
  const id = req.params.id
  console.log('Test', id);
  try {
    const getQuotes = await axios.get(`${url}?requestId=${id}`, axiosConfig)
    // console.log(getQuotes.data.rateQuotes)
    res.send(getQuotes.data)
  } catch (e) {
    console.error(e);
  } 
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));