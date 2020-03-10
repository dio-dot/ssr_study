const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');
const passport = require('passport');
const {isLoggedIn} = require('./middleware');

const router = express.Router();
router.get("/",isLoggedIn,(req, res) => {
    if(!req.user){
        return res.status(401).send('로그인이 필요합니다.')
    }
    const user = Object.assign({},req.user.toJSON());
    delete user.password;
    res.json(user)
});
router.post("/", async(req, res, next) => {
    try {
      const exUser = await db.User.findOne({
          where:{
              userId:req.body.userId
          }
      })
      if(exUser) { res.status(403).send('이미 사용중인 아이디 입니다.')}
      const hashedPassword = await bcrypt.hash(req.body.password,12)
      const newUser = await db.User.create({
          nickname:req.body.nickname,
          userId:req.body.userId,
          password:hashedPassword
      })
      return res.status(200).send(newUser);
    } catch (error) {
        console.error(error)
        return next(error)
    }
});
router.get("/:id", async(req, res,next) => {
    try {
        const User = await db.User.findOne({
            where:{id:parseInt(req.params.id,10)},
            include:[{
                model:db.Post,
                as:'Posts',
                attributes:['id']
            },{
                model:db.User,
                as:'Followings',
                attributes:['id']
            },{
                model:db.User,
                as:'Followers',
                attributes:['id']
            }],
            attributes:['id','nickname'],
        })
        res.json(User);
    } catch (error) {
        console.error(error);
        next(error)
    }
});
router.post("/login", (req, res,next) => {
    passport.authenticate('local',(err,user,info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user,async(err)=>{
            if(err) return next(err);

            const fullUser = await db.User.findOne({
                where:{id:user.id},
                include:[{
                    model:db.Post,
                    as:'Posts',
                    attributes:['id']
                },{
                    model:db.User,
                    as:'Followings',
                    attributes:['id']
                },{
                    model:db.User,
                    as:'Followers',
                    attributes:['id']
                }],
                attributes:['id','nickname','userId']
            })
            return res.json(fullUser);
        })
    })(req,res,next);
});
router.post("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('logout 성공');
});
router.get("/:id/followings",isLoggedIn,async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where:{id:parseInt(req.params.id,10)||(req.user&&req.user.id)||0},
        })
        const followings = await user.getFollowings({
            attributes:['nickname','id'],
            limit:parseInt(req.query.limit,10),
            offset:parseInt(req.query.offset,10)
        })
        res.json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.get("/:id/followers",isLoggedIn, async(req, res, next) => {
    try {
        const user = await db.User.findOne({
            where:{id:parseInt(req.params.id,10)||(req.user&&req.user.id)||0}
        })
        const followers = await user.getFollowers({
            attributes:['nickname','id'],
            limit:parseInt(req.query.limit,10),
            offset:parseInt(req.query.offset,10)
        })
        res.json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete("/:id/follower", isLoggedIn,async(req, res, next) => {
    try {
        const me = await db.User.findOne({
            where:{id:req.user.id}
        })
         await me.removeFollowers({
             where:{id:parseInt(req.params.id)}
         }) 
         res.json(req.params.id);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.post("/:id/follow",isLoggedIn,async (req, res,next) => {
    try {
        const me = await db.User.findOne({
            where:{id:req.user.id}
        })
        await me.addFollowing(req.params.id);
        res.send(req.params.id);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete("/:id/follow",isLoggedIn, async(req, res,next) => {
    try {
        const me = await db.User.findOne({
            where:{id:req.user.id}
        })
        await me.removeFollowing(req.params.id);
        res.send(req.params.id);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete("/:id/follower", (req, res) => {

});
router.get("/:id/posts", async(req, res,next) => {
    try {
        const posts = await db.Post.findAll({
            where:{
                userId:parseInt(req.params.id,10)||(req.user&&req.user.id)||0,
                RetweetId:null
            },
            include:[{
                model:db.User,
                attributes:['id','nickname']
            },
            {
                model:db.Image
            },
            {
                model:db.User,
                through:'Like',
                as:'Likers',
                attributes:['id']
              }
            ]
        })
        res.json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.patch ('/nickname',isLoggedIn,async(req,res,next)=>{
    try {
        console.log(req.body)
        await db.User.update({
            nickname:req.body.nickName,
        },{
            where:{id:req.user.id}
        }
        )
        res.send(req.body.nickName);
    } catch (error) {
        next(error);
    }
})
module.exports = router;