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

const getProducts = (id) =>{
    return knex.select('*').from('items').where('listId',id)
}

const getLists = () => {
    return knex.select('*').from('lists')
}

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Ostoslista')
})

app.get('/tuotteet/:listId', async (req, res) => {
    try {
        const values = await getProducts(req.params.listId)
        res.json(values)
    } catch(err) {
        console.error(err)
        res.status(500).json({error: String(err)})
    }
})

app.post('/tuote/',async (req, res) => {
    const product = {
        product: req.body.product,
        listId: req.body.listId,
        done: false
    }
    const createdProducts = await knex('items').insert(product).returning('id')
    product.id = createdProducts[0].id
    res.json(product)
})

app.put('/tuote/:id', async (req, res) => {
    const id = Number(req.params.id)
    let lista = await getProducts()
    const prodToChange = lista.find(prod => prod.id === id)
    if (!prodToChange) {
        res.status(404).end()
        return
    }

    await knex('items').update(req.body).where('id', id)
    Object.assign(prodToChange, req.body)
    res.json(prodToChange)
})

app.delete('/tuote/:id', async (req, res) => {
    const id = Number(req.params.id)
    await knex('items').where('id', id).del()
    res.json({id})
})

app.get('/listat', async(req, res) => {
    try {
    const lists = await getLists()
    res.json(lists)
    //console.log(lists)
    }catch(err) {
        console.log(err)
        res.status(500).json({error: String(err)})
    }

})

app.post('/lista', async (req,res) => {
    const list = {
        name: req.body.name, 
        owner:req.body.owner
        }
        const createdList = await knex('lists').insert(list).returning('id')
        list.id = createdList[0].id
        //console.log(list)
        res.json(list)
})

app.delete('/lista/:id', async(req ,res) => {
    const id = Number(req.params.id)
    await knex('items').where('listId', id).del()
    await knex('lists').where('id', id).del()
    
    res.json({id})
})

const port = 3001
app.listen(port)

console.log(`Server  runing on port: ${port}`)
