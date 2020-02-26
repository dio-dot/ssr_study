const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
        include:[{
            model:db.User,
            attributes:['id','nickname']
        },{
          model:db.Image
        },{
          model:db.User,
          through:'Like',
          as:'Likers',
          attributes:['id']
        }],
        order:[['createdAt','DESC']]
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
