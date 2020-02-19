const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag',async(req,res,next)=>{
    try {
        const posts = await db.Post.findAll({
            // where:
            include:[{
                model:db.Hashtag,
                where:{
                    src:decodeURIComponent(req.params.tag)
                }
            },
            {
                model:db.User,
                attributes:['id','nickname']
            }
            ]
        })
        console.log(posts);
        res.json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports=router;