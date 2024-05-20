const express = require('express');
const router = express.Router();
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {signinSchema, signupSchema, updateBody} = require("../validate");
const {authMiddleware} = require("../middleware");

router.post("/signup", async (req, res) =>{

    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if(existingUser){
        return res.status(411).json({
            msg: "Email already taken"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    await Account.create({
        userId: user._id,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        msg: "User created successfully",
        token: token
    })

    // schema parsing
    // existingUser already exists or not
    // create existingUser in db
    // create token
});

router.post("/signin", async (req, res) =>{
    const {success} = signinSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg: "Error while logging in"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(existingUser){
        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_SECRET);

        res.json({
            token: token
        });
    
        return;
    }
    
    res.status(411).json({
        msg: "error while logging in"
    })
});

router.put("/", authMiddleware, async (req, res) =>{
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            msg: "Error while updating information"
        });
    }

    await User.updateOne(req.body, {
        id: req.userId
    });

    res.json({
        msg: "updated successfully"
    });
});

router.get("/bulk", async (req, res) =>{
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex" : filter
            }
        }]
    });

    res.json({
        user: users.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });

});

module.exports = router;