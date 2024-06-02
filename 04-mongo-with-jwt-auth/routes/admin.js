const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const {JWT_SECRET} = require("../config");
const router = Router();
const jwt = require("jsonwebtoken");
const jwt_secret = require("..");

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic

    const username=req.body.username;
    const password=req.body.password;

    await Admin.create({
        username:username,
        password:password
    })

    res.json({
        message:"admin created successfully"
    })

});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    const user=await User.find({
          username,
          password
    })
    if(user){
        const token=jwt.sign({
            username
        },jwt_secret);

        res.json({
            token
        })
    }

    else{
        res.status(411).json({
            message:"incorresct email and pass"
        })
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic

    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic

    const response = await Course.find({});

    res.json({
        courses: response
    })
});

module.exports = router;