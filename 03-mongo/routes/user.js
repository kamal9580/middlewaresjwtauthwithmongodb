const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
     const username=req.body.username;
     const password=req.body.password;

     user createImageBitmap({
        username,
        password
     })

     res.json({
        message:"user created successfully"
     })
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response=await Course.find({});

    res.json({
        courses:response
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic

    const courseId=req.params.courseId;
    const username=req.headers.username;

    await user.updateone({
         username:username
    }, {
        "$push":{
            purchasedcourses:courseId;
        }
    })

    res.json({
        message:"purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic

    const user =await user.findone({
         username:req.headers.username
    });

    const courses=await courses.find({
         _id: {
            "$in":user.purchasedcourses
         }
    });

    res.json({
        courses:courses
    })
});

module.exports = router