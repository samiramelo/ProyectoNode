const { Router } = require("express")
const router = Router()
const { db } = require('../firebase')

router.get('/artistas', async (req, res)=>{
    try {
        const artistas = await db.collection('artistas').get()
        const datos = artistas.docs.map((artista)=>{
        return{
            id : artista.id,
            ...artista.data()
        }
    })
    res.send(datos)
    }catch(err){
        res.status(500)
        res.send('Error en el servidor')
    }
})

router.get('/artistas/:id', async (req, res)=>{
    const id = req.params.id
    const datos = await db.collection('artistas').doc(id).get()
    res.send(datos.data())
})

router.get('/canciones', async (req, res)=>{
    try{
        const canciones = await db.collection('canciones').get()
    const datos = canciones.docs.map((cancion)=>{
        return{
            id : cancion.id,
            ...cancion.data()
        }
    })
    res.send(datos)
    }catch{
        res.status(500)
        res.send('Error en el servidor')
    }
    
})

router.get('/canciones/:id', async (req, res)=>{
    const id = req.params.id
    const datos = await db.collection('canciones').doc(id).get()
    res.send(datos.data())
})

router.get('/canciones/album/:id', async (req, res)=>{
    try{
    const id =req.params.id
    const canciones = await db.collection('canciones').get()
    const cancion = (await db.collection('canciones').doc(id).get()).data()
    const album = cancion.album
    const datos = canciones.docs.map((cancion)=>{
        return{
            id: cancion.id,
            ...cancion.data()
        }
    })
    const result = datos.filter(cancion => cancion.album == album)
    res.send(result)
    }catch{
        res.status(500)
        res.send('Error en el servidor')
        }
    })

    router.get('/artistas/canciones/:id', async (req,res) => {
        try{
            const id = req.params.id
            const artista = (await db.collection('artistas').doc(id).get()).data()
            const canciones = await artista.canciones
            const songs = await db.collection('canciones').get()
            const datos = songs.docs.map((cancion) => {
                return{
                    id: cancion.id,
                    ...cancion.data()
                }
            })
            const id2 = canciones[0]
            const id3 = canciones[1]
            const result = datos.filter(cancion => cancion.id == id2 || cancion.id == id3 )
            res.send(result)

        }catch{
            res.status(500)
        res.send('Error en el servidor')
        }
        
    })



module.exports = router