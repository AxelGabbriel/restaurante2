const follow={}
const seguir= require('../database')


follow.crearseguidor=(req,res)=>{
try {
    seguir.crearseguidor(req,res)    
} catch (e) {
    console.log(e)
}
}

follow.crearseguido=(req,res)=>{
    try {
        seguir.crearseguido(req,res)
    } catch (e) {
        console.log(e)
    }
}

follow.obtenerseguidor=(req,res)=>{

    try{
        seguir.seguidorporusuario(req,res)
    }catch(e){
        console.log(e)
    }
}
follow.obtenerseguido=(req,res)=>{
    try{
        seguir.seguidoporusuario(req,res)
    }catch(e){
        console.log(e)
    }
}

follow.borraraseguidor=(req,res)=>{
    try {
        seguir.eliminarseguidor(req,res)
    } catch (e) {
        console.log(e)
    }
}
follow.borraraseguido=(req,res)=>{
    try {
        seguir.eliminarseguido(req,res)
    } catch (e) {
        console.log(e)
    }
}

module.exports= follow;