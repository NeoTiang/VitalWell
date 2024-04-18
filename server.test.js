const request = require('supertest');
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Mocking the API call to OpenAI to not actually perform an HTTP request
jest.mock('axios');

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }]
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

test('responds to /chat', async () => {
  const fakeData = {
    data: {
      choices: [{ message: { content: "Hello, how can I assist?" } }]
    }
  };

  axios.post.mockResolvedValue(fakeData);

  const response = await request(app)
    .post('/chat')
    .send({ message: "Hello" })
    .expect('Content-Type', /json/)
    .expect(200);

  expect(response.body).toEqual(fakeData.data);
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object), expect.any(Object));
});

