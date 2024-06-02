const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic

    const username=req.body.username;
    const password =req.body.password;

    await Admin.create({
        username:username,
        password:password
    })

    res.json({
        message:"admin created successfully"
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic

    const title=req.body.title;
    const description=req.body.description;
    const imagelink=req.body.price;
    const price =req.body.price;

    //we have to use zod beacuse if user send wrong input then zod verifies it

    const newcourse=await Course.create({
        title,
        description,
        imagelink,
        price
    })

    res.json({
        message:'course created successfully',courseid:newcourse._id
    })

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
       const response= await Course.find({});

       res.json({
        Course:response
       })
});

module.exports = router;