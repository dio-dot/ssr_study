const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');
const passport = require('passport');

const router = express.Router();
router.get("/", (req, res) => {
    if(!req.user){
        return res.status(401).send('로그인이 필요합니다.')
    }
    const user = Object.assign({},req.user.toJSON());
    delete user.password;
    res.json(user)
});
router.post("/", async(req, res, next) => {
    console.log(req);
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
        console.log(error)
        return next(error)
    }
});
router.get("/:id", (req, res) => {});
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
router.get("/:id/follow", (req, res) => {});
router.post("/:id/follow", (req, res) => {});
router.delete("/:id/follow", (req, res) => {});
router.delete("/:id/follower", (req, res) => {});
router.get("/:id/posts", async(req, res,next) => {
    try {
        const posts = await db.Post.findAll({
            where:{
                UserId:parseInt(req.params.id),
                RetweetId:null
            },
            include:[{
                model:db.User,
                attributes:['id','nickname']
            }]
        })
        res.json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;