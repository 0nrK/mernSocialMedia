const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

//update user
router.put("/:id", async (req,res) => {
    if(req.body.userId === req.params.id || req.user.isAdmin) {
        if(req.body.password){
            try{
                const salt = await brcypt.genSalt(10)
                req.body.password = await brcypt.hash(req.body.password, salt)
            }catch(err){
                return res.status(500).json(err)
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            })
            res.status(200).json("Account has been updated")
        }catch(err) {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("You can update only your account!")
    }
})
//delete user
router.delete("/:id", async (req,res) => {
    if(req.body.userId === req.params.id || req.user.isAdmin) {
        try{
            const user = await User.findByIdAndDelete({_id: req.params.id})
            res.status(200).json("Account has been deleted")
        }catch(err) {
            return res.status(500).json(err)
        }
    }else{
        return res.status(403).json("You can delete only your account!")
    }
})



//get user
router.get("/", async (req,res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
            ? await User.findById(userId) 
            : await User.findOne({username:username}); 
        const {password, updatedAt, ...other} = user._doc 
        res.status(200).json(user)
    }catch(err) {
        res.status(500).json(err)
    }
})

// get friends
router.get("/friends/:userId", async (req, res) => {
    try{
        const user = await User.findbyId(req.params.userId);
        const freinds = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })

        )
        let friendList = []
        friends.map(friend => {
            const {_id, username, profilePicture} = friend
            friendList.push({})
        })
        res.status(200).json(friendList)
    }catch(err) {
        res.status(500).json(err)
    }
})




//follow a user
router.put("/:id/follow", async(req,res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updatedOne({ $push:{ followers:req.body.userId } })
                await currentUser.updatedOne({ $push:{ followings:req.body.userId } })
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json("you already follow this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you cant follow yourself")
    }
})
//unfollow a user 
router.put("/:id/unfollow", async(req,res) => {
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updatedOne({ $push:{ followers:req.body.userId } })
                await currentUser.updatedOne({ $push:{ followings:req.body.userId } })
                res.status(200).json("user has been unfollowed")
            }else{
                res.status(403).json("you're not following this user")
            }
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you cant unfollow yourself")
    }
})

module.exports = router