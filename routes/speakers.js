const express = require('express')

const router = express.Router()


module.exports = ()=>{
    router.get('/',(req,res)=>{
    return res.send('Speakers List')
});

    router.get('/:shortname',(req,res)=>{
    return res.send('Detailed Page of : '+ req.params.shortname)
});

return router;
};