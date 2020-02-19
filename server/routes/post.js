const express = require("express");
const router = express.Router();
const db = require("../models");
const {isLoggedIn} = require('./middleware');

router.post("/", isLoggedIn,async (req, res, next) => {
  try {
    const hastags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    if (hastags) {
      const result = await Promise.all(
        hastags.map(tag =>
          db.Hashtag.findOrCreate({
            where: {
              src: tag.slice(1).toLowerCase()
            }
          })
        )
      );
      await newPost.addHashtags(result.map(r => r[0]));
    }
    const fullPost = await db.Post.findOne({
      where:{id:newPost.id},
      include:[{
        model:db.User
      }]
    })
    res.json(fullPost);

  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/images", (req, res) => {});
router.get("/:id/comments",async(req,res,next)=>{
  try {
    const post =await db.Post.findOne({where:{id:req.params.id}})
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where:{postId:parseInt(req.params.id,10)},
      order:[['createdAt','ASC']],
      include:[{
        model:db.User,
        attributes:['id','nickname']
      }]
    })
    res.json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
})
router.post("/:id/comment",isLoggedIn,async(req,res,next)=>{
  try {
    const post = await db.Post.findOne({where:{id:req.params.id}})
    if(!post){
      return res.status(404).send('포스트가 존재 하지않습니다.');
    }
    const newComment = await db.Comment.create({
      PostId:post.id,
      UserId:req.user.id,
      content:req.body.content
    })
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where:{
        id:newComment.id
      },
      include:[{
        model:db.User,
        attributes:['id','nickname']
      }]
    })
    return res.json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
})
module.exports = router;
