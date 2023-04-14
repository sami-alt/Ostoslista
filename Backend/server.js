const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
      filename: "./list.db"
    }
});

knex.raw('CREATE TABLE if not exists items (product text, id integer primary key autoincrement, done boolean)')
    .then(() => console.log('created'))

const getLista = () =>{
    return knex.select('*').from('items')
}

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Ostoslista')
})

app.get('/lista', async (req, res) => {
    try {
        const values = await getLista()
        res.json(values)
    } catch(err) {
        console.error(err)
        res.status(500).json({error: String(err)})
    }
})

app.post('/lista/',async (req, res) => {
    const product = {
        product: req.body.product,
        done: false
    }
    const createdProducts = await knex('items').insert(product).returning('id')
    product.id = createdProducts[0].id

    res.json(product)
})



app.put('/lista/:id', async (req, res) => {
    const id = Number(req.params.id)
    let lista = await getLista()
    const prodToChange = lista.find(prod => prod.id === id)
    if (!prodToChange) {
        res.status(404).end()
        return
    }

    await knex('items').update(req.body).where('id', id)
    console.log(req.body)

    Object.assign(prodToChange, req.body)
    res.json(prodToChange)
})

app.delete('/lista/:id', async (req, res) => {
    const id = Number(req.params.id)
    await knex('items').where('id', id).del()
    let lista = await getLista()
    res.json(lista)
})

app.post('/lista/id',(req,res) => {
    const lista = {
        name:'listan nimi',
        id:1,
        owner:ownerID,
        content:{...content}
    }
})


const port = 3001
app.listen(port)

console.log(`Server  runing on port: ${port}`)
