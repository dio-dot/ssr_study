const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag',async(req,res,next)=>{
    try {
        const posts = await db.Posts.findAll({
            // where:
            include:[{
                model:db.Hashtag,
                where:{
                    name:decodeURIComponent(req.params.name)
                }
            },
            {
                model:db.User,
                attributes:['id','nickname']
            }
            ]
        })
        res.json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
})