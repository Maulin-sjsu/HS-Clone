const express = require('express');
const path = require('path');
const cookieSession =  require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');


const FeedbackService = require('./services/FeedbackService')
const SpeakerService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakersService = new SpeakerService('./data/speakers.json')

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy',1)


app.use(cookieSession({
    name : 'session',
    keys : ['gsdjshdgdsjhghd','gdjhgjdhbcbvhgd']
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use(express.static(path.join(__dirname,'./static')));

app.locals.siteName = 'ROUX Meetup'

app.use(async (req,res,next)=>{
    try{
        const names = await speakersService.getNames();
        res.locals.speakerNames = names;
        return next();

    }catch(err){
        return next(err)
    }

})

app.use('/',routes({
    feedbackService,
    speakersService,
}));

app.use((req,res,next) =>{
    return next(createError(404,'File not found'))
})

app.use((err,req,res,next) => {
    res.locals.message = err.message
    const status = err.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error');
})


// app.get('/speakers',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./static/speakers.html'))
// });


app.listen(port,()=>{
    console.log('Express Server is listing on port : ' + port + ' !')
});
