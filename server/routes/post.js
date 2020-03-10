const express = require("express");
const router = express.Router();
const db = require("../models");
const { isLoggedIn } = require("./middleware");
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    },
    limits: { fileSize: 20 * 1024 * 1024 }
  })
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
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
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        //image:[1,2,3,4]
        const images = await Promise.all(
          req.body.image.map(v => {
            return db.Image.create({
              src: v
            });
          })
        );
        await newPost.addImages(images);
      } else {
        //image:1
        const image = await db.Image.create({
          src: req.body.image
        });
        await newPost.addImage(image);
      }
    }
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User
        },
        {
          model: db.Image
        }
      ]
    });
    res.json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// router.post("/images", upload.fields([{name:'image'},{name:'img'}]),(req, res) => {
router.post("/images", upload.array("image"), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});
router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다.");
    }
    const comments = await db.Comment.findAll({
      where: { postId: parseInt(req.params.id, 10) },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("포스트가 존재 하지않습니다.");
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });
    return res.json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다.");
    }
    await post.addLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (error) {
    console.error(e);
    next(e);
  }
});
router.delete("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다.");
    }
    await post.removeLiker(req.user.id);
    res.json({ userId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/:id/retweet", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id }
    ,include:[{
      model:db.Post,
      as:'Retweet',
    }]
    });
    if (!post) {
      return res.status(404).send("포스트가 존재하지 않습니다.");
    }
    if (req.user.id === post.UserId ||(post.Retweet && post.Retweet.UserId ===req.user.id)) {
      return res.status(404).send("자신의 글을 리트윗 할수없습니다.");
    }
    const retweetTarget = post.RetweetId || post.id;
    const exPost = await db.Post.findOne({
      where: {
        UserId: req.user.id,
        RetweetId: retweetTarget
      }
    });
    if (exPost) {
      return res.status(404).send("이미 리트윗 했습니다.");
    }
    const retweet = await db.Post.create({
      UserId: req.user.id,
      RetweetId: retweetTarget,
      content: "retweet"
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where: { id: retweet.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"]
            },
            {
              model: db.Image
            }
          ]
        }
      ]
    });
    res.json(retweetWithPrevPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
