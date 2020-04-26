const express = require('express')
const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')

const router = express.Router()


// router.get('/',(req,res)=>{
//     // res.sendFile(path.join(__dirname,'./static/index.html'))
//     res.render('pages/index',{pageTitle: 'Welcome'})
// });

// module.exports = router;


module.exports = (params)=>{
    router.get('/',(req,res)=>{

        // if(!req.session.visitcount){
        //     req.session.visitcount = 0;
        // }
        // req.session.visitcount += 1;
        // console.log('Number of Visits : '+ req.session.visitcount);

    // res.sendFile(path.join(__dirname,'./static/index.html'))
    res.render('layouts',{pageTitle: 'Welcome',template: 'index'})
});

router.use('/speakers', speakersRoute(params))
router.use('/feedback', feedbackRoute(params))

return router;
};