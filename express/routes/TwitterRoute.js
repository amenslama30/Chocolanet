const {Router} = require('express')
const router = Router()
const axios = require('axios');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

const consumerKey = 'DXxAMiyO8tWSpXZxpnuzE8t6w';
const consumerSecret = 'B18hbWBlquDAUbzMGPHpPsXQZEUMoj6a76KQS8az1C2Nnil66c';
const accessToken = '752329959906181120-TA3mfX2RrYsgDG9CFLAiMe9vMMk6tLv';
const tokenSecret = 'zpzEct47dtMbYH4b18kmv4Xy4DoShSzfNZuHu8175BedH';

function getOAuthHeaders(url, method) {
    const oauth = OAuth({
      consumer: { key: consumerKey, secret: consumerSecret },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
      },
    });
  
    const requestData = {
      url: url,
      method: method,
    };
  
    const token = {
      key: accessToken,
      secret: tokenSecret,
    };
  
    return oauth.toHeader(oauth.authorize(requestData, token));
  }
  
  // Function to get user by username
  async function getUserByUsername() {
    const url = `https://api.twitter.com/2/users/me`;
    const headers = getOAuthHeaders(url, 'GET');
  
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.response.data}`);
    }
  }
  
  // Endpoint to lookup user by username
  router.get('/lookupUser', async (req, res) => {
    try {
      
  
      const user = await getUserByUsername();
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error.message);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

module.exports = router;