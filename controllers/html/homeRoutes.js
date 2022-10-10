const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll( {
      raw: true,
      include: User,
      order: [['timestamp', 'ASC']],
    });
    console.log(posts);
    res.render('homepage', {
      posts
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;