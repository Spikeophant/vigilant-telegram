const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll( {
      raw: true,
      nest: true,
      include: [User],
      order: [['createdAt', 'DESC']],
    });
    console.log(posts);
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;