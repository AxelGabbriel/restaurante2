const express= require('express')
const router = express.Router()
const usuario = require('../controllers/usuario')
const post =require('../controllers/post')
const like = require('../controllers/like')
const retweet=require('../controllers/retweet')
const follow=require('../controllers/follow')
const passport=require('passport')
const { passportAuth } = require('../middlewares')

//rutas usuario
router.put( '/modificar/:id',usuario.modificar)
router.get('/buscar-usuario/:id_usuario',usuario.buscarid)
router.get('/buscar-nombre/:nombre',usuario.buscarnombreusuario)
//rutas post
router.post('/crear-post',post.crear)
router.put('/editar-post/:id',post.editar)
router.get('/buscar-post/:id_post',post.buscarid)
router.get( '/buscar-nombrepost/:author', post.buscarauthor)
//rutas para los likes
router.get('/like-usuario/:id_usuario',like.usuario)
router.get('/like-post/:id_post',like.post)
router.post('/crearlike-post',like.crearlikepost)
router.post('/crearlike-usuario',like.crearlikeusuario)
router.delete('/borrarlikes-post/:id_post',like.borrarlikespost)
router.delete('/borrarlikes-usuario/:id_usuario',like.borrarlikesusuarios)
//rutas para retweet
router.get('/retweet-post/:id_post',retweet.post)
router.post('/retweet-crear', retweet.crear)
//rutas para follow
router.post('/seguidor-crear',follow.crearseguidor)
router.post('/seguido-crear',follow.crearseguido)
router.get('/buscar-seguidor/:id_user1',follow.obtenerseguidor)
router.get('/buscar-seguido/:id_user2',follow.obtenerseguido)
router.delete('/borrar-seguidor/:id_user1',follow.borraraseguidor)
router.delete('/borrar-seguido/:id_user2',follow.borraraseguido)
//registro y login
router.post('/registro',usuario.register)


router.post('/login', passportAuth)

router.get('/perfil',(req,res)=>{
    res.send('perfil')
})

module.exports = router