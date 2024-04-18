const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const ocrText = localStorage.getItem('ocrText');
console.log('OCR Text:', ocrText);
priorContent = ocrText


app.post('/chat', async (req, res) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: priorContent +req.body.message }]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Error processing your request', error: error.message });
    }
  });
app.post('/', async (req, res) => {
    res.json({response:"yes"})
  })
  