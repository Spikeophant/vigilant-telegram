const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/post', withAuth, async (req, res) => {
  try {
    res.render('post', {logged_in: req.session.logged_in}
    );
  } catch (err) {
    console.log(req.body)
    console.log(err);
    res.status(500).render('error', {logged_in: req.session.logged_in});
  }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: User,
      raw: true,
      nest: true,
    });
    res.render('singlePost', {post, logged_in: req.session.logged_in})
  } catch (err) {
    console.log(err);
    res.status(500).render('error');
  }
});

router.post('/post', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    await Post.create( {
      ...req.body,
    author_id: req.session.user_id});
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).render('error', {logged_in: req.session.logged_in});
  }
})

module.exports = router;