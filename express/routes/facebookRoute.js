const {Router} = require('express')
const router = Router()
const User = require("../models/User")
const Provider = require("../models/Provider")
const jwt = require('jsonwebtoken')
const axios = require('axios');
const PDFDocument = require('pdfkit');


router.get('/getFeed', async (req, res) => {
  const token = req.query.accessToken
  jwt.verify(token, 'secret key amen', async (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized access' });
    } else {
      try {
        const user = await User.findById(decodedToken.userId).populate('provider');
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const providerTokens = [];
        for (const providerRef of user.provider) {
          const provider = await Provider.findById(providerRef._id);
          if (provider && provider.providerName === 'facebook.com') {
              providerTokens.push(provider.providerToken);
          }
        }
        const accessToken = providerTokens[0]
        const response = await axios.get(`https://graph.facebook.com/me/posts?fields=id,message,created_time,shares,reactions.summary(total_count),comments.summary(total_count),privacy,attachments,full_picture&access_token=${accessToken}`);
        const publicPosts = response.data.data.filter(post => {
          return post.privacy && (post.privacy.value === 'EVERYONE' || post.privacy.value === 'ALL_FRIENDS' || post.privacy.value === 'FRIENDS_OF_FRIENDS');
        });
        res.status(200).json(publicPosts); 


      } catch (dbError) {
        console.error('Error fetching user from database:', dbError);
        res.status(500).json({ message: 'Erreur de récupération des données utilisateur' });
      }
    }
  });
})

router.get('/getLatestPost', async (req, res) => {
  const token = req.query.accessToken;
  jwt.verify(token, 'secret key amen', async (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized access' });
    } else {
      try {
        const user = await User.findById(decodedToken.userId).populate('provider');
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const providerTokens = [];
        for (const providerRef of user.provider) {
          const provider = await Provider.findById(providerRef._id);
          if (provider && provider.providerName === 'facebook.com') {
            providerTokens.push(provider.providerToken);
          }
        }
        const accessToken = providerTokens[0];
        const response = await axios.get(`https://graph.facebook.com/me/posts?fields=id,message,created_time,shares,reactions.summary(total_count),comments.summary(total_count),privacy,attachments,full_picture&access_token=${accessToken}`);
        const publicPosts = response.data.data.filter(post => {
          return post.privacy && (post.privacy.value === 'EVERYONE' || post.privacy.value === 'ALL_FRIENDS' || post.privacy.value === 'FRIENDS_OF_FRIENDS');
        });

        if (publicPosts.length === 0) {
          return res.status(404).json({ message: 'No public posts found' });
        }

        // Sort posts by created_time in descending order and get the latest post
        const latestPost = publicPosts.sort((a, b) => new Date(b.created_time) - new Date(a.created_time))[0];

        res.status(200).json(latestPost);
      } catch (dbError) {
        console.error('Error fetching user from database:', dbError);
        res.status(500).json({ message: 'Erreur de récupération des données utilisateur' });
      }
    }
  });
});

router.delete('/deletePost', async (req, res) => {
  try {
    
    const { postId, accessToken } = req.query;

        // Delete the post using the Facebook Graph API
        await axios.delete(`https://graph.facebook.com/${postId}?access_token=${accessToken}`);
        
        // Respond with success message
        res.status(200).json({ message: 'Post deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

router.get('/getEngagements', async (req, res) => {
  const token = req.query.accessToken
  jwt.verify(token, 'secret key amen', async (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized access' });
    } else {
      try {
        const user = await User.findById(decodedToken.userId).populate('provider');
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const providerTokens = [];
        for (const providerRef of user.provider) {
          const provider = await Provider.findById(providerRef._id);
          if (provider && provider.providerName === 'facebook.com') {
              providerTokens.push(provider.providerToken);
          }
        }
        const accessToken = providerTokens[0]
        const response = await axios.get(`https://graph.facebook.com/me/posts?fields=shares,reactions.summary(total_count),comments.summary(total_count),privacy&access_token=${accessToken}`);
        const engagements = response.data.data.filter(post => {
          return post.privacy && (post.privacy.value === 'EVERYONE' || post.privacy.value === 'ALL_FRIENDS' || post.privacy.value === 'FRIENDS_OF_FRIENDS');
        });

        // Calculate total posts, likes, comments, and shares
        const totals = engagements.reduce((acc, post) => {
          acc.likes += post.reactions ? post.reactions.summary.total_count : 0;
          acc.comments += post.comments ? post.comments.summary.total_count : 0;
          acc.shares += post.shares ? post.shares.count : 0;
          acc.posts += 1;
          return acc;
        }, { likes: 0, comments: 0, shares: 0, posts: 0 });

        res.status(200).json(totals); 


      } catch (dbError) {
        console.error('Error fetching user from database:', dbError);
        res.status(500).json({ message: 'Erreur de récupération des données utilisateur' });
      }
    }
  });
})

router.get('/generateReport', async (req, res) => {
  const token = req.query.accessToken
  jwt.verify(token, 'secret key amen', async (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: 'Unauthorized access' });
    } else {
      try {
        const user = await User.findById(decodedToken.userId).populate('provider');
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const providerTokens = [];
        for (const providerRef of user.provider) {
          const provider = await Provider.findById(providerRef._id);
          if (provider && provider.providerName === 'facebook.com') {
              providerTokens.push(provider.providerToken);
          }
        }
        const accessToken = providerTokens[0]
        const response = await axios.get(`https://graph.facebook.com/me/posts?fields=shares,reactions.summary(total_count),comments.summary(total_count),privacy&access_token=${accessToken}`);
        const engagements = response.data.data.filter(post => {
          return post.privacy && (post.privacy.value === 'EVERYONE' || post.privacy.value === 'ALL_FRIENDS' || post.privacy.value === 'FRIENDS_OF_FRIENDS');
        });

        // Create a new PDF document
        const doc = new PDFDocument();
        
        // Buffer to store PDF data
        const buffers = [];

        // Pipe the PDF into a buffer
        doc.on('data', (chunk) => {
          buffers.push(chunk);
        });

        // Write content to the PDF
        doc.text('Engagement Report', { align: 'center' });
        doc.moveDown();
        engagements.forEach(post => {
          doc.text(`Post ID: ${post.id}`);
          doc.text(`Likes: ${post.reactions ? post.reactions.summary.total_count : 0}`);
          doc.text(`Comments: ${post.comments ? post.comments.summary.total_count : 0}`);
          doc.text(`Shares: ${post.shares ? post.shares.count : 0}`);
          doc.moveDown();
        });

        // Finalize the PDF
        doc.end();

        // Finalize the PDF and send it in the response
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          res.setHeader('Content-Type', 'application/pdf');
          res.send(pdfData);
        });
      } catch (dbError) {
        console.error('Error fetching user from database:', dbError);
        res.status(500).json({ message: 'Erreur de récupération des données utilisateur' });
      }
    }
  });
});

router.get('/getPages', async (req, res) => {
  try {
    // const accessToken = req.query.accessToken
    const accessToken = 'EAAE7XR8tFAMBO6KSJZAgsmtd0eMx4Gd8a1J5B8PTsh3XFYF7GYzqc7cPlMpsYUgsaXZCOjW7JeESdaPpnSTp7o6ElgOJkihoANJ6saxuA528oeJW2l613QgxtZAsKk5K3ZBNZAMdzBJFxSIBU5FizEHQZAo2CQlNvLH8ifFasWKSRGoVMZB4cDOyGVK'
    const response = await axios.get(`https://graph.facebook.com/me?fields=accounts{id,name,access_token}&access_token=${accessToken}`);
    res.json(response.data); 
  } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).json({ error: 'Failed to fetch pages' });
  }
})
router.get('/latestPost', async (req, res) => {
  try {
      const { accesstoken } = req.query;
      const response = await axios.get(`https://graph.facebook.com/v19.0/me/posts?fields=id,message,created_time,shares,reactions.summary(total_count),comments.summary(total_count),attachments,full_picture&access_token=${accesstoken}`);
      const allPosts = response.data.data; // Selecting all posts
      res.status(200).json(allPosts);
  } catch (error) {
      console.error('Error fetching latest post:', error);
      res.status(500).json({ error: 'Failed to fetch latest post' });
  }
});

router.post('/createPostTimer', async (req, res) => {
  try {
    const { message, PageId, accesstoken, scheduled_publish_time } = req.body.message;
    const response = await axios.post(`https://graph.facebook.com/v19.0/${PageId}/feed?message=${message}&published=false&scheduled_publish_time=${scheduled_publish_time}&access_token=${accesstoken}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.post('/createPost', async (req, res) => {
  try {
    const { message, PageId, accesstoken } = req.body.message;
    
    const response = await axios.post(`https://graph.facebook.com/v19.0/${PageId}/feed?message=${message}&access_token=${accesstoken}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.get('/getPageEngagements', async (req, res) => {
      try {
        const { pageId, accessToken } = req.query
        const response = await axios.get(`https://graph.facebook.com/${pageId}/posts?fields=shares,reactions.summary(total_count),comments.summary(total_count)&access_token=${accessToken}`);
        // Calculate total posts, likes, comments, and shares
        const engagements = response.data.data
        const totals = engagements.reduce((acc, post) => {
          acc.likes += post.reactions ? post.reactions.summary.total_count : 0;
          acc.comments += post.comments ? post.comments.summary.total_count : 0;
          acc.shares += post.shares ? post.shares.count : 0;
          acc.posts += 1;
          return acc;
        }, { likes: 0, comments: 0, shares: 0, posts: 0 });
        res.status(200).json(totals); 
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
})

module.exports = router;