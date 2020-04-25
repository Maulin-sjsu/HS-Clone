const express = require('express')
const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')

const router = express.Router()


// router.get('/',(req,res)=>{
//     // res.sendFile(path.join(__dirname,'./static/index.html'))
//     res.render('pages/index',{pageTitle: 'Welcome'})
// });

// module.exports = router;


module.exports = ()=>{
    router.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname,'./static/index.html'))
    res.render('pages/index',{pageTitle: 'Welcome'})
});

router.use('/speakers', speakersRoute())
router.use('/feedback', feedbackRoute())

return router;
};