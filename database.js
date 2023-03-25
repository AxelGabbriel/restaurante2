const {Pool}= require('pg');
const helpers= require('./helpers')
const config={
    connectionString: process.env.DATABASE_URL,
  max:500,
  min:100,
  ssl:{rejectUnauthorized:false}
};

const pool = new Pool(config);

//funcion de crear usuario para registro
const crearusuario= async(req,res)=>{
    
const  { 
     username,
     bio,
     correo,
     birthday,
     nombre, 
     direccion,                                
     clave
      }= req.body;
      const passwordencriptado= await helpers.encryptPassword(clave);
       const result= await pool.query('INSERT INTO usuario(username,bio,correo,birthday,nombre,direccion,clave) VALUES($1,$2,$3,$4,$5,$6,$7)', [
      username,bio,correo,birthday,nombre,direccion,passwordencriptado ])
   console.log(result)
  res.json(result.rows)
   
}
//funcion para actualizar usuario
const modificarusuario=async(req,res)=>{
    
    const {username,bio,correo,birthday,nombre,direccion,clave,id_usuario}= req.body
    const response= await pool.query('UPDATE usuario SET username= $1 ,bio=$2, correo=$3 ,birthday=$4,nombre=$5,direccion=$6,clave=$7 WHERE id_usuario=$8',[
        username,bio,correo,birthday,nombre,direccion,clave,id_usuario
    ])

    console.log(response)
    res.json(response.rows)
}

//funcion crearpost
const crearpost=async (req,res)=>{
const {titulo,author,fecha,contenido} = req.body
const response = await pool.query('INSERT INTO post(titulo,author,fecha,contenido) VALUES($1,$2,$3,$4)',[
    titulo,author,fecha,contenido])

    console.log(response);
    res.json(response.rows)
}

//funcion editar post
const editarpost=async(req,res)=>{
    
    const {titulo,author,fecha,contenido,id_post}= req.body
    const response= await pool.query('UPDATE post SET titulo= $1,author=$2,fecha=$3,contenido=$4 WHERE id_post =$5',[
        titulo,author,fecha,contenido,id_post
    ])
    console.log(response)
    res.json(response.rows)
}

//buscando usuario por id
const buscaridusuario= async(req,res)=>{
    const id_usuario =req.params.id_usuario
    const response=await pool.query('SELECT* FROM usuario WHERE  id_usuario=$1',[id_usuario])
    console.log(response);
    res.json(response.rows)
} 

//buscando usuario por nombre
const buscarnombreusuario= async(req,res)=>{
    const nombre =req.params.nombre
    const response=await pool.query('SELECT* FROM usuario WHERE  nombre=$1',[nombre])
    console.log(response);
    res.json(response.rows)
} 

//buscando post por id
const buscaridpost= async(req,res)=>{
    const id_post =req.params.id_post
    const response=await pool.query('SELECT* FROM post WHERE  id_post=$1',[id_post])
    console.log(response);
    res.json(response.rows)
} 

//buscando post por nombre
const buscarauthorpost= async(req,res)=>{
    const author =req.params.author
    const response=await pool.query('SELECT* FROM post WHERE  author=$1',[author])
    console.log(response);
    res.json(response.rows)

} 

//like por post
const likeporpost=async(req,res)=>{
    const id_post=req.params.id_post
    const response= await pool.query('SELECT* FROM liked WHERE id_post=$1',[id_post])
    console.log(response);
    res.json(response.rowcount);
}
//like por usuario
const likeporusuario=async(req,res)=>{
    const id_usuario=req.params.id_usuario
    const response= await pool.query('SELECT * FROM liked WHERE id_usuario=$1',[id_usuario])
    console.log(response)
    res.json(response.rowcount);
}
//crear likes para post
const crearlikepost=async (req,res)=>{
    const {like_id,id_post} = req.body
    const response = await pool.query('INSERT INTO liked(like_id,id_post) VALUES($1,$2)',[
        like_id,id_post])
      console.log(response);
      res.json(response.rows)
 }

//crear likes para usuario
const crearlikeusuario=async (req,res)=>{
    const {like_id,id_usuario} = req.body
    const response = await pool.query('INSERT INTO liked(like_id,id_usuario) VALUES($1,$2)',[
        like_id,id_usuario])
      console.log(response);
      res.json(response.rows);
    }
//buscar retweet por id
const buscaridretweet= async(req,res)=>{
    const id_post =req.params.id_post
    const response=await pool.query('SELECT* FROM retweet WHERE  id_post=$1',[id_post])
    console.log(response);
    res.json(response.rowcount);
} 

//crear retweet
const crearretweetpost=async (req,res)=>{
    const {retweet_id,id_post} = req.body
    const response = await pool.query('INSERT INTO retweet(retweet_id,id_post) VALUES($1,$2)',[
        retweet_id,id_post])
      console.log(response)
      res.json(response.row);
    }

//crear seguidores
const crearseguidor=async (req,res)=>{
    const {follow_id,id_user1} = req.body
    const response = await pool.query('INSERT INTO follow(follow_id,id_user1) VALUES($1,$2)',[
        follow_id,id_user1])
      console.log(response)
      res.json(response.rowCount);
    }
    //creando seguido
    const crearseguido=async (req,res)=>{
        const {follow_id,id_user2} = req.body
        const response = await pool.query('INSERT INTO follow(follow_id,id_user2) VALUES($1,$2)',[
            follow_id,id_user2])
          console.log(response)
          res.json(response.row);
        }
     //buscar seguidores de un usuario pór id
     const seguidorporusuario=async(req,res)=>{
        const id_user1=req.params.id_user1
        const response= await pool.query('SELECT * FROM follow WHERE id_user1=$1',[id_user1])
        console.log(response)
        res.json(response.rowCount);
    }

    //buscar seguido de un usuario
    const seguidoporusuario=async(req,res)=>{
        const id_user2 =req.params.id_user2
        const response= await pool.query('SELECT * FROM follow WHERE id_user2=$1',[id_user2])
        console.log(response)
        res.json(response.rowCount);
    }

    //eliminar like de un usuario
    const eliminarlikeusuario=async(req,res)=>{
        const id_usuario =req.params.id_usuario
        const response= await pool.query('DELETE * FROM liked WHERE id_usuario=$1',[id_usuario])
        console.log(response)
        res.json(response.rowS);
    }

    //eliminar like de un post
    const eliminarlikepost=async(req,res)=>{
        const id_post =req.params.id_post
        const response= await pool.query('DELETE* FROM liked WHERE id_post=$1',[id_post])
        console.log(response)
        res.json(response.rows);
    }
    const eliminarseguidor=async(req,res)=>{
        const id_user1 =req.params.id_user1
        const response= await pool.query('DELETE* FROM follow WHERE id_user1=$1',[id_user1])
        console.log(response)
        res.json(response.rows);
    }
    const eliminarseguido=async(req,res)=>{
        const id_user2 =req.params.id_user2
        const response= await pool.query('DELETE* FROM follow WHERE id_user2=$1',[id_user2])
        console.log(response)
        res.json(response.rows);
    }

module.exports={
       
    eliminarseguido,
    eliminarseguidor,
    eliminarlikeusuario,
    eliminarlikepost,
    seguidoporusuario,
    seguidorporusuario,
    crearseguidor,
    crearseguido,
    crearretweetpost,
    buscaridretweet,
    crearlikeusuario,
    crearlikepost,
    modificarusuario,
    crearusuario,
    crearpost,
    editarpost,
    buscaridusuario,
    buscarnombreusuario,
    buscaridpost,
    buscarauthorpost,
    likeporpost,
    likeporusuario
}
