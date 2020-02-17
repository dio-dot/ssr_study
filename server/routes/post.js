const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/", async (req, res, next) => {
  console.log(req.body.content);
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
    const User = await newPost.getUser();
    newPost.User = User;
    res.json(newPost);

  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/images", (req, res) => {});
module.exports = router;
