const express = require("express");
const {requireSignin} = require("../controllers/auth");
const {postById,getPosts,createPost,postsByUser,isPoster, deletePost} = require("../controllers/post");
const {userById} = require("../controllers/user");
const {createPostValidator} = require('../validator')

const router = express.Router();

router.get("/",getPosts);
router.post("/post/new/:userId", requireSignin,createPost,createPostValidator);
router.get("/posts/by/:userId",postsByUser);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);



//params
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);


module.exports = router; 