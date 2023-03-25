const like= {}
const likes=require('../database')

like.usuario=(req,res)=>{
try {
likes.likeporusuario(req,res)
   
} catch (e) {
    console.log(e);
}

}

like.post=(req,res)=>{
   
    try {
        likes.likeporpost(req,res);
       
    } catch (e) {
        console.log(e)
    }
}

like.crearlikepost=(req,res)=>{
    try {
         likes.crearlikepost(req,res);
         
    } catch (e) {
        console.log(e);
    }


}

like.crearlikeusuario=(req,res)=>{
    try {
        likes.crearlikeusuario(req,res)
        
    } catch (e) {
        console.log(e);
    }


}

like.borrarlikespost=(req,res)=>{
    try{like.borrarlikespost(req,res)}catch(e){console.log(e)}
}

like.borrarlikesusuarios=(req,res)=>{
    try{like.borrarlikesusuarios(req,res)}catch(e){console.log(e)}
}


module.exports = like;