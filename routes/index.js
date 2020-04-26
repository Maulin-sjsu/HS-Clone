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

    const {speakersService} = params;

    router.get('/',async (req,res,next) => {

        try{
            const artwork = await speakersService.getAllArtwork();
            const topSpeakers = await speakersService.getList();
            return res.render('layouts',{pageTitle: 'Welcome',template: 'index', topSpeakers, artwork})
        }catch(err){
            return next(err)
        }
        
        // if(!req.session.visitcount){
        //     req.session.visitcount = 0;
        // }
        // req.session.visitcount += 1;
        // console.log('Number of Visits : '+ req.session.visitcount);

    // res.sendFile(path.join(__dirname,'./static/index.html'))
    
});

router.use('/speakers', speakersRoute(params))
router.use('/feedback', feedbackRoute(params))

return router;
};