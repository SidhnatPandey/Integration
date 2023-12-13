

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
 
const app = express();
const PORT = process.env.PORT || 3001;
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
// Replace with your GitHub App's client ID and secret
const CLIENT_ID = 'Iv1.1aa60a10d65d348f';
const CLIENT_SECRET = '36c1b64ed1a520e751dea89c3212b3dcc2d88aa4';
 
 
 
app.get('/oauth-callback', async (req, res) => {
  const code = req.query.code;
  console.log(code);
 

  const access_token = await exchangeCodeForToken(code);
  console.log(access_token);
  
  res.redirect(`http://localhost:3000/welcomePage?token=${access_token}`);
});
async function exchangeCodeForToken(code) {
  const response = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );
  return response.data.access_token;
}
 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 