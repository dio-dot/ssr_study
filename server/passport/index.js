const passport = require('passport');
const db =require('../models');
const local = require('./local');

module.exports=()=>{
    passport.serializeUser((user,done)=>{ //서버쪽에 [{id:3,cookie:'asdasd'}]
        done(null,user.id);
    })
    passport.deserializeUser(async(id,done)=>{
        try {
            const user = await db.User.findOne({
                where:{id},
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
            return done(null,user); //req.user
        } catch (error) {
            return done(error);
        }
    })

    local();
}