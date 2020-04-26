const express = require('express');
const path = require('path');
const cookieSession =  require('cookie-session');

const FeedbackService = require('./services/FeedbackService')
const SpeakerService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakersService = new SpeakerService('./data/speakers.json')

const routes = require('./routes');

const app = express();
const port = 3000;

app.set('trust proxy',1)

app.use(cookieSession({
    name : 'session',
    keys : ['gsdjshdgdsjhghd','gdjhgjdhbcbvhgd']
}))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use(express.static(path.join(__dirname,'./static')));

app.use('/',routes({
    feedbackService,
    speakersService,
}));



// app.get('/speakers',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./static/speakers.html'))
// });


app.listen(port,()=>{
    console.log('Express Server is listing on port : ' + port + ' !')
});
