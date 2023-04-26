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

const getList = () =>{
    return knex.select('*').from('items')
}

const getLists = () => {
    return knex.select('*').from('lists')
}

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Ostoslista')
})

app.get('/tuotteet', async (req, res) => {
    try {
        const values = await getList()
        console.log(values)
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
    let lista = await getList()
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

app.delete('/tuote/:id', async (req, res) => {
    const id = Number(req.params.id)
    await knex('items').where('id', id).del()
    let lista = await getLists()
    res.json(lista)
})

app.get('/listat', async(req, res) => {
    try {
    const lists = await getLists()
    res.json(lists)
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

        res.json(list)
})


const port = 3001
app.listen(port)

console.log(`Server  runing on port: ${port}`)
