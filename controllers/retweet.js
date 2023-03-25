const retweet = {}
const tweets = require('../database')
retweet.post=(req,res)=>{
    try {
    
     tweets.buscaridretweet(req,res);
    } catch (e) {
        console.log(e);
    }
    
    }

    retweet.crear=(req,res)=>{
        try {
        
         tweets.crearretweetpost(req,res)
        } catch (e) {
            console.log(e);
        }
        
        }


module.exports= retweet